import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/auth';
import { createPledgeSchema } from '@/lib/validations';
import { apiHandler, successResponse } from '@/lib/api-utils';
import { z } from 'zod';

const querySchema = z.object({
  status: z.enum(['ACTIVE', 'COMPLETED', 'VERIFIED', 'CANCELLED']).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(50).optional().default(20),
});

/**
 * GET /api/pledges
 * Get user's environmental pledges
 */
export const GET = apiHandler(async (request: NextRequest) => {
  const currentUser = await AuthService.requireAuth();
  
  const searchParams = request.nextUrl.searchParams;
  const params = Object.fromEntries(searchParams.entries());
  const { status, page, limit } = querySchema.parse(params);

  const whereClause: any = { userId: currentUser.userId };
  if (status) whereClause.status = status;

  const [pledges, total] = await Promise.all([
    prisma.environmentalPledge.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.environmentalPledge.count({ where: whereClause }),
  ]);

  const result = {
    pledges,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };

  return successResponse(result);
});

/**
 * POST /api/pledges
 * Create a new environmental pledge
 */
export const POST = apiHandler(async (request: NextRequest) => {
  const currentUser = await AuthService.requireAuth();
  
  const body = await request.json();
  const validatedData = createPledgeSchema.parse(body);

  const pledge = await prisma.environmentalPledge.create({
    data: {
      ...validatedData,
      userId: currentUser.userId,
      status: 'ACTIVE',
    },
  });

  return successResponse(pledge, 'Pledge created successfully');
});
