import { z } from 'zod';

// ============================================
// AUTH SCHEMAS
// ============================================

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  bio: z.string().max(500).optional(),
  website: z.string().url().optional().or(z.literal('')),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  interests: z.array(z.string()).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

// ============================================
// CLIMATE DATA SCHEMAS
// ============================================

export const climateQuerySchema = z.object({
  city: z.string().min(1, 'City is required'),
  hours: z.coerce.number().int().min(1).max(168).optional().default(24),
});

export const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const createClimateReadingSchema = z.object({
  location: z.string().min(1),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  temperature: z.number(),
  feelsLike: z.number().optional(),
  tempMin: z.number().optional(),
  tempMax: z.number().optional(),
  aqi: z.number().int().min(0).max(500),
  pm25: z.number().optional(),
  pm10: z.number().optional(),
  co: z.number().optional(),
  no2: z.number().optional(),
  so2: z.number().optional(),
  o3: z.number().optional(),
  humidity: z.number().min(0).max(100).optional(),
  pressure: z.number().optional(),
  visibility: z.number().optional(),
  windSpeed: z.number().optional(),
  windDirection: z.number().min(0).max(360).optional(),
  rainfall: z.number().optional(),
  snowfall: z.number().optional(),
  cloudCover: z.number().int().min(0).max(100).optional(),
  uvIndex: z.number().optional(),
  solarRadiation: z.number().optional(),
  source: z.string().min(1),
  readingTime: z.coerce.date().optional(),
});

// ============================================
// ALERT SCHEMAS
// ============================================

export const createAlertSchema = z.object({
  type: z.enum([
    'AIR_QUALITY',
    'HEAT_WAVE',
    'COLD_WAVE',
    'UV_WARNING',
    'STORM',
    'FLOOD',
    'DROUGHT',
    'WILDFIRE',
    'POLLUTION_SPIKE',
  ]),
  location: z.string().min(1),
  threshold: z.number().optional(),
});

export const updateAlertSchema = z.object({
  isActive: z.boolean().optional(),
  threshold: z.number().optional(),
});

// ============================================
// COMMUNITY SCHEMAS
// ============================================

export const createGroupSchema = z.object({
  name: z.string().min(3, 'Group name must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  category: z.string().optional(),
  isPublic: z.boolean().default(true),
});

export const updateGroupSchema = createGroupSchema.partial();

export const createPostSchema = z.object({
  groupId: z.string().cuid().optional(),
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  content: z.string().min(10, 'Content must be at least 10 characters').max(10000),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
});

export const updatePostSchema = createPostSchema.partial();

export const createCommentSchema = z.object({
  postId: z.string().cuid(),
  content: z.string().min(1, 'Comment cannot be empty').max(2000),
});

export const createPledgeSchema = z.object({
  pledgeType: z.enum([
    'PLANT_TREES',
    'REDUCE_DRIVING',
    'SAVE_ENERGY',
    'REDUCE_WASTE',
    'RENEWABLE_ENERGY',
    'WATER_CONSERVATION',
  ]),
  quantity: z.number().int().positive(),
  unit: z.string().min(1),
  description: z.string().max(500).optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
});

// ============================================
// SUPPLY CHAIN SCHEMAS
// ============================================

export const createSupplyChainItemSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  productCode: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  origin: z.string().min(1, 'Origin is required'),
  currentLocation: z.string().min(1, 'Current location is required'),
  destination: z.string().min(1, 'Destination is required'),
  carbonFootprint: z.number().optional(),
  energyUsed: z.number().optional(),
  waterUsed: z.number().optional(),
  wasteGenerated: z.number().optional(),
  temperature: z.number().optional(),
  humidity: z.number().optional(),
  estimatedArrival: z.coerce.date().optional(),
});

export const updateSupplyChainItemSchema = z.object({
  currentLocation: z.string().optional(),
  status: z
    .enum(['PENDING', 'IN_TRANSIT', 'ARRIVED', 'DELAYED', 'CANCELLED', 'DELIVERED'])
    .optional(),
  temperature: z.number().optional(),
  humidity: z.number().optional(),
  actualArrival: z.coerce.date().optional(),
});

export const createSupplyChainEventSchema = z.object({
  itemId: z.string().cuid(),
  eventType: z.string().min(1),
  location: z.string().min(1),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  description: z.string().optional(),
  timestamp: z.coerce.date().optional(),
});

// ============================================
// PAGINATION SCHEMA
// ============================================

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// ============================================
// TYPE EXPORTS
// ============================================

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ClimateQueryInput = z.infer<typeof climateQuerySchema>;
export type CreateClimateReadingInput = z.infer<typeof createClimateReadingSchema>;
export type CreateAlertInput = z.infer<typeof createAlertSchema>;
export type CreateGroupInput = z.infer<typeof createGroupSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type CreatePledgeInput = z.infer<typeof createPledgeSchema>;
export type CreateSupplyChainItemInput = z.infer<typeof createSupplyChainItemSchema>;
export type UpdateSupplyChainItemInput = z.infer<typeof updateSupplyChainItemSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
