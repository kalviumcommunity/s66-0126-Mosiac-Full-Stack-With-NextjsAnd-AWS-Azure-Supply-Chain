import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CacheService } from '@/lib/redis';
import { climateQuerySchema } from '@/lib/validations';
import { apiHandler, successResponse, validateQuery, APIError } from '@/lib/api-utils';

/**
 * GET /api/climate/history
 * Fetch historical climate data for a city with caching
 * 
 * Query parameters:
 * - city: string (required) - City name
 * - hours: number (optional) - Number of hours to fetch (default: 24, max: 168)
 * 
 * Example: /api/climate/history?city=Mumbai&hours=48
 */
export const GET = apiHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const { city, hours } = validateQuery(climateQuerySchema, searchParams);

  // Try to get from cache first
  const cacheKey = `climate:history:${city.toLowerCase()}:${hours}`;
  const cached = await CacheService.get(cacheKey);
  
  if (cached) {
    return successResponse(cached, 'Data from cache');
  }

  // Calculate the start time
  const startTime = new Date();
  startTime.setHours(startTime.getHours() - hours);

  // Fetch climate readings from the last N hours
  const readings = await prisma.climateReading.findMany({
    where: {
      city: {
        equals: city,
        mode: 'insensitive',
      },
      readingTime: {
        gte: startTime,
      },
    },
    orderBy: {
      readingTime: 'asc',
    },
    select: {
      id: true,
      location: true,
      temperature: true,
      feelsLike: true,
      aqi: true,
      pm25: true,
      humidity: true,
      uvIndex: true,
      rainfall: true,
      windSpeed: true,
      readingTime: true,
    },
  });

  if (readings.length === 0) {
    throw new APIError(404, `No historical data found for ${city}`);
  }

  const result = {
    city,
    hours,
    count: readings.length,
    readings,
  };

  // Cache for 30 minutes
  await CacheService.set(cacheKey, result, 'medium');

  return successResponse(result);
});
