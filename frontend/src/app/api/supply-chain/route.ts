import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/auth';
import { createSupplyChainItemSchema } from '@/lib/validations';
import { apiHandler, successResponse } from '@/lib/api-utils';

/**
 * GET /api/supply-chain
 * Get user's supply chain items
 */
export const GET = apiHandler(async () => {
  const currentUser = await AuthService.requireAuth();

  const items = await prisma.supplyChainItem.findMany({
    where: { userId: currentUser.userId },
    include: {
      events: {
        orderBy: { timestamp: 'desc' },
        take: 5,
      },
      alerts: {
        where: { isResolved: false },
      },
      _count: {
        select: { events: true, alerts: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return successResponse({ items });
});

/**
 * POST /api/supply-chain
 * Create a new supply chain item
 */
export const POST = apiHandler(async (request: NextRequest) => {
  const currentUser = await AuthService.requireAuth();
  
  const body = await request.json();
  const validatedData = createSupplyChainItemSchema.parse(body);

  // Generate unique product code if not provided
  const productCode = validatedData.productCode || 
    `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const item = await prisma.supplyChainItem.create({
    data: {
      ...validatedData,
      productCode,
      userId: currentUser.userId,
      status: 'PENDING',
    },
    include: {
      events: true,
      alerts: true,
    },
  });

  // Create initial event
  await prisma.supplyChainEvent.create({
    data: {
      itemId: item.id,
      eventType: 'created',
      location: validatedData.origin,
      description: 'Supply chain item created',
      timestamp: new Date(),
    },
  });

  return successResponse(item, 'Supply chain item created successfully');
});
