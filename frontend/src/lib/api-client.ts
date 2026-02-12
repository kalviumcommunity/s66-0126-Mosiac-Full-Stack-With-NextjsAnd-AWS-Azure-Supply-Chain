// API Client utility functions

class APIClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Request failed');
    }

    return data;
  }

  // Climate Data
  async getLatestClimate(city: string) {
    return this.request<any>(`/api/climate/latest?city=${encodeURIComponent(city)}`);
  }

  async getClimateHistory(city: string, hours: number = 24) {
    return this.request<any>(`/api/climate/history?city=${encodeURIComponent(city)}&hours=${hours}`);
  }

  // Alerts
  async getActiveAlerts(filters?: { city?: string; severity?: string }) {
    const params = new URLSearchParams();
    if (filters?.city) params.append('city', filters.city);
    if (filters?.severity) params.append('severity', filters.severity);
    return this.request<any>(`/api/alerts/active?${params}`);
  }

  // Community
  async getGroups(filters?: { city?: string; category?: string; page?: number }) {
    const params = new URLSearchParams();
    if (filters?.city) params.append('city', filters.city);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.page) params.append('page', filters.page.toString());
    return this.request<any>(`/api/community/groups?${params}`);
  }

  async createGroup(data: any) {
    return this.request<any>('/api/community/groups', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Posts
  async getPosts(filters?: { groupId?: string; page?: number }) {
    const params = new URLSearchParams();
    if (filters?.groupId) params.append('groupId', filters.groupId);
    if (filters?.page) params.append('page', filters.page.toString());
    return this.request<any>(`/api/posts?${params}`);
  }

  async createPost(data: any) {
    return this.request<any>('/api/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Profile
  async getProfile() {
    return this.request<any>('/api/profile');
  }

  async updateProfile(data: any) {
    return this.request<any>('/api/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Pledges
  async getPledges(filters?: { status?: string; page?: number }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.page) params.append('page', filters.page.toString());
    return this.request<any>(`/api/pledges?${params}`);
  }

  async createPledge(data: any) {
    return this.request<any>('/api/pledges', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Supply Chain
  async getSupplyChainItems() {
    return this.request<any>('/api/supply-chain');
  }

  async createSupplyChainItem(data: any) {
    return this.request<any>('/api/supply-chain', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new APIClient();
export default apiClient;
