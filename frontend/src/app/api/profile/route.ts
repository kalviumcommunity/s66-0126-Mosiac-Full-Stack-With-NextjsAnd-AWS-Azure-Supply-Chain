import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/auth';
import { updateProfileSchema } from '@/lib/validations';
import { apiHandler, successResponse } from '@/lib/api-utils';

/**
 * GET /api/profile
 * Get current user's profile
 */
export const GET = apiHandler(async () => {
  const currentUser = await AuthService.requireAuth();

  const user = await prisma.user.findUnique({
    where: { id: currentUser.userId },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      avatar: true,
      city: true,
      state: true,
      country: true,
      latitude: true,
      longitude: true,
      profile: true,
      createdAt: true,
      _count: {
        select: {
          posts: true,
          comments: true,
          environmentalPledges: true,
          groupMemberships: true,
        },
      },
    },
  });

  return successResponse(user);
});

/**
 * PATCH /api/profile
 * Update current user's profile
 */
export const PATCH = apiHandler(async (request: NextRequest) => {
  const currentUser = await AuthService.requireAuth();
  
  const body = await request.json();
  const validatedData = updateProfileSchema.parse(body);

  // Separate user fields from profile fields
  const userFields: any = {};
  const profileFields: any = {};

  if (validatedData.firstName) userFields.firstName = validatedData.firstName;
  if (validatedData.lastName) userFields.lastName = validatedData.lastName;
  if (validatedData.city) userFields.city = validatedData.city;
  if (validatedData.state) userFields.state = validatedData.state;
  if (validatedData.country) userFields.country = validatedData.country;

  if (validatedData.bio !== undefined) profileFields.bio = validatedData.bio;
  if (validatedData.website !== undefined) profileFields.website = validatedData.website;
  if (validatedData.twitter) profileFields.twitter = validatedData.twitter;
  if (validatedData.linkedin) profileFields.linkedin = validatedData.linkedin;
  if (validatedData.phone) profileFields.phone = validatedData.phone;
  if (validatedData.organization) profileFields.organization = validatedData.organization;
  if (validatedData.interests) profileFields.interests = validatedData.interests;

  // Update user and profile
  const updatedUser = await prisma.user.update({
    where: { id: currentUser.userId },
    data: {
      ...userFields,
      ...(Object.keys(profileFields).length > 0 && {
        profile: {
          update: profileFields,
        },
      }),
    },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      avatar: true,
      city: true,
      state: true,
      country: true,
      profile: true,
    },
  });

  return successResponse(updatedUser, 'Profile updated successfully');
});
