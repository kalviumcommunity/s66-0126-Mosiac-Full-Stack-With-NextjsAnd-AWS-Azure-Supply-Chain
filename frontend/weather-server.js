require('dotenv').config({ path: '.env.weather' });
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 5000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = process.env.WEATHER_API_URL;

// Configure axios to ignore certificate verification for development
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

const axiosInstance = axios.create({
  httpsAgent: httpsAgent
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Get weather by city name
app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    if (!WEATHER_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axiosInstance.get(
      `${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get weather by coordinates
app.get('/api/weather/coords', async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    if (!WEATHER_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axiosInstance.get(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get 5-day forecast by city name
app.get('/api/forecast', async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    if (!WEATHER_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axiosInstance.get(
      `${WEATHER_API_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching forecast:', error.message);
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

// Get air quality data by coordinates
app.get('/api/air-quality', async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    if (!WEATHER_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axiosInstance.get(
      `${WEATHER_API_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching air quality:', error.message);
    res.status(500).json({ error: 'Failed to fetch air quality data' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Key configured: ${WEATHER_API_KEY ? 'Yes' : 'No'}`);
});
