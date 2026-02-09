const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const weatherService = {
  // Get current weather by city name
  getWeatherByCity: async (city: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/weather?city=${city}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  },

  // Get current weather by coordinates
  getWeatherByCoords: async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/weather/coords?lat=${lat}&lon=${lon}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch weather: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  },

  // Get 5-day forecast by city
  getForecastByCity: async (city: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/forecast?city=${city}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch forecast: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  },

  // Get air quality data
  getAirQuality: async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/air-quality?lat=${lat}&lon=${lon}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch air quality: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching air quality:', error);
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  },
};
