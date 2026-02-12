import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CacheService } from '@/lib/redis';
import { climateQuerySchema } from '@/lib/validations';
import { apiHandler, successResponse, validateQuery, APIError } from '@/lib/api-utils';

/**
 * GET /api/climate/latest
 * Fetch the latest climate reading for a specific city with caching
 * 
 * Query parameters:
 * - city: string (required) - City name
 * 
 * Example: /api/climate/latest?city=New Delhi
 */
export const GET = apiHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const { city } = validateQuery(
    climateQuerySchema.pick({ city: true }),
    searchParams
  );

  // Try to get from cache first
  const cacheKey = `climate:latest:${city.toLowerCase()}`;
  const cached = await CacheService.get(cacheKey);
  
  if (cached) {
    return successResponse(cached, 'Data from cache');
  }

  // Fetch the latest climate reading for the specified city
  const latestReading = await prisma.climateReading.findFirst({
    where: {
      city: {
        equals: city,
        mode: 'insensitive',
      },
    },
    orderBy: {
      readingTime: 'desc',
    },
  });

  if (!latestReading) {
    throw new APIError(404, `No climate data found for ${city}`);
  }

  // Cache for 5 minutes (short TTL for real-time data)
  await CacheService.set(cacheKey, latestReading, 'short');

  return successResponse(latestReading);
});
