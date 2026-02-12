import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/auth';
import { CacheService } from '@/lib/redis';
import { createPostSchema } from '@/lib/validations';
import { apiHandler, successResponse, APIError } from '@/lib/api-utils';
import { z } from 'zod';

const querySchema = z.object({
  groupId: z.string().cuid().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(50).optional().default(20),
});

/**
 * GET /api/posts
 * Get posts with pagination
 */
export const GET = apiHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const params = Object.fromEntries(searchParams.entries());
  const { groupId, page, limit } = querySchema.parse(params);

  const cacheKey = `posts:list:${groupId || 'all'}:${page}:${limit}`;
  const cached = await CacheService.get(cacheKey);
  
  if (cached) {
    return successResponse(cached, 'Data from cache');
  }

  const whereClause: any = {};
  if (groupId) whereClause.groupId = groupId;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: whereClause,
      include: {
        author: {
          select: { id: true, username: true, avatar: true },
        },
        group: {
          select: { id: true, name: true, slug: true },
        },
        _count: {
          select: { comments: true },
        },
      },
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' },
      ],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where: whereClause }),
  ]);

  const result = {
    posts,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };

  await CacheService.set(cacheKey, result, 'short');
  return successResponse(result);
});

/**
 * POST /api/posts
 * Create a new post
 */
export const POST = apiHandler(async (request: NextRequest) => {
  const currentUser = await AuthService.requireAuth();
  
  const body = await request.json();
  const validatedData = createPostSchema.parse(body);

  // Verify group membership if posting to a group
  if (validatedData.groupId) {
    const membership = await prisma.groupMember.findFirst({
      where: {
        groupId: validatedData.groupId,
        userId: currentUser.userId,
      },
    });

    if (!membership) {
      throw new APIError(403, 'You must be a member of this group to post');
    }
  }

  const post = await prisma.post.create({
    data: {
      ...validatedData,
      authorId: currentUser.userId,
      images: validatedData.images || [],
      tags: validatedData.tags || [],
    },
    include: {
      author: {
        select: { id: true, username: true, avatar: true },
      },
      group: {
        select: { id: true, name: true, slug: true },
      },
    },
  });

  // Invalidate posts cache
  await CacheService.invalidate('posts');

  return successResponse(post, 'Post created successfully');
});
