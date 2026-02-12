import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CacheService } from '@/lib/redis';
import { apiHandler, successResponse } from '@/lib/api-utils';
import { z } from 'zod';

const querySchema = z.object({
  city: z.string().optional(),
  severity: z.enum(['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH', 'EXTREME']).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
});

/**
 * GET /api/alerts/active
 * Fetch all active environmental alerts with caching
 * 
 * Query parameters:
 * - city: string (optional) - Filter by city
 * - severity: string (optional) - Filter by severity level
 * - page: number (optional) - Page number
 * - limit: number (optional) - Items per page
 * 
 * Example: /api/alerts/active?city=Delhi&severity=HIGH
 */
export const GET = apiHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const params = Object.fromEntries(searchParams.entries());
  const { city, severity, page, limit } = querySchema.parse(params);

  const cacheKey = `alerts:active:${city || 'all'}:${severity || 'all'}:${page}:${limit}`;
  const cached = await CacheService.get(cacheKey);
  
  if (cached) {
    return successResponse(cached, 'Data from cache');
  }

  const whereClause: any = {
    isActive: true,
  };

  if (city) {
    whereClause.city = {
      equals: city,
      mode: 'insensitive',
    };
  }

  if (severity) {
    whereClause.severity = severity;
  }

  const [alerts, total] = await Promise.all([
    prisma.environmentalAlert.findMany({
      where: whereClause,
      orderBy: [
        { severity: 'desc' },
        { startTime: 'desc' },
      ],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.environmentalAlert.count({ where: whereClause }),
  ]);

  const result = {
    alerts,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };

  await CacheService.set(cacheKey, result, 'short');

  return successResponse(result);
});
