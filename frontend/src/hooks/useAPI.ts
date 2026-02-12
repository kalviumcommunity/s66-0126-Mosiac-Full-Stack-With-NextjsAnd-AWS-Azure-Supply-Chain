'use client ';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';

// Generic hook for API calls
export function useAPI<T>(
  apiCall: () => Promise<any>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
}

// Climate data hooks
export function useLatestClimate(city: string) {
  return useAPI(
    () => apiClient.getLatestClimate(city),
    [city]
  );
}

export function useClimateHistory(city: string, hours: number = 24) {
  return useAPI(
    () => apiClient.getClimateHistory(city, hours),
    [city, hours]
  );
}

// Alerts hooks
export function useActiveAlerts(filters?: { city?: string; severity?: string }) {
  return useAPI(
    () => apiClient.getActiveAlerts(filters),
    [filters?.city, filters?.severity]
  );
}

// Community hooks
export function useGroups(filters?: { city?: string; category?: string; page?: number }) {
  return useAPI(
    () => apiClient.getGroups(filters),
    [filters?.city, filters?.category, filters?.page]
  );
}

export function usePosts(filters?: { groupId?: string; page?: number }) {
  return useAPI(
    () => apiClient.getPosts(filters),
    [filters?.groupId, filters?.page]
  );
}

// Profile hooks
export function useProfile() {
  return useAPI(() => apiClient.getProfile(), []);
}

// Pledges hooks
export function usePledges(filters?: { status?: string; page?: number }) {
  return useAPI(
    () => apiClient.getPledges(filters),
    [filters?.status, filters?.page]
  );
}

// Supply Chain hooks
export function useSupplyChainItems() {
  return useAPI(() => apiClient.getSupplyChainItems(), []);
}

// Mutation hook for creating/updating data
export function useMutation<T>(
  mutationFn: (data: T) => Promise<any>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (data: T) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mutationFn(data);
      return response;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

// Specific mutation hooks
export function useCreateGroup() {
  return useMutation((data: any) => apiClient.createGroup(data));
}

export function useCreatePost() {
  return useMutation((data: any) => apiClient.createPost(data));
}

export function useCreatePledge() {
  return useMutation((data: any) => apiClient.createPledge(data));
}

export function useUpdateProfile() {
  return useMutation((data: any) => apiClient.updateProfile(data));
}

export function useCreateSupplyChainItem() {
  return useMutation((data: any) => apiClient.createSupplyChainItem(data));
}
