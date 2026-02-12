import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/auth';
import { CacheService } from '@/lib/redis';
import { createGroupSchema } from '@/lib/validations';
import { apiHandler, successResponse, APIError } from '@/lib/api-utils';
import { z } from 'zod';

const querySchema = z.object({
  city: z.string().optional(),
  category: z.string().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(50).optional().default(20),
});

/**
 * GET /api/community/groups
 * Fetch all public community groups with caching
 */
export const GET = apiHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const params = Object.fromEntries(searchParams.entries());
  const { city, category, page, limit } = querySchema.parse(params);

  const cacheKey = `groups:list:${city || 'all'}:${category || 'all'}:${page}:${limit}`;
  const cached = await CacheService.get(cacheKey);
  
  if (cached) {
    return successResponse(cached, 'Data from cache');
  }

  const whereClause: any = { isPublic: true };
  if (city) whereClause.city = { equals: city, mode: 'insensitive' };
  if (category) whereClause.category = category;

  const [groups, total] = await Promise.all([
    prisma.group.findMany({
      where: whereClause,
      include: {
        _count: {
          select: { members: true, posts: true },
        },
        createdBy: {
          select: { id: true, username: true, avatar: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.group.count({ where: whereClause }),
  ]);

  const result = {
    groups,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };

  await CacheService.set(cacheKey, result, 'medium');
  return successResponse(result);
});

/**
 * POST /api/community/groups
 * Create a new community group
 */
export const POST = apiHandler(async (request: NextRequest) => {
  const currentUser = await AuthService.requireAuth();
  
  const body = await request.json();
  const validatedData = createGroupSchema.parse(body);

  // Generate slug from name
  const slug = validatedData.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Check if slug already exists
  const existingGroup = await prisma.group.findUnique({ where: { slug } });
  if (existingGroup) {
    throw new APIError(409, 'A group with this name already exists');
  }

  const group = await prisma.group.create({
    data: {
      ...validatedData,
      slug,
      createdById: currentUser.userId,
      members: {
        create: {
          userId: currentUser.userId,
          role: 'ADMIN',
        },
      },
    },
    include: {
      _count: { select: { members: true, posts: true } },
      createdBy: { select: { id: true, username: true, avatar: true } },
    },
  });

  // Invalidate groups cache
  await CacheService.invalidate('groups');

  return successResponse(group, 'Group created successfully');
});
