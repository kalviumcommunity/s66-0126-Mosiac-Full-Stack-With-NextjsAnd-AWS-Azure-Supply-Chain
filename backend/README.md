# Weather API Backend

Simple Node.js backend to fetch weather data from OpenWeatherMap API.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure your API key in `.env`:
```
WEATHER_API_KEY=your_actual_api_key_here
```

Get a free API key from: https://openweathermap.org/api

3. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Test Endpoint
- **GET** `/api/test` - Test if server is working

### Weather by City
- **GET** `/api/weather?city=London` - Get weather for a city

### Weather by Coordinates
- **GET** `/api/weather/coords?lat=51.5074&lon=-0.1278` - Get weather by lat/lon

### Health Check
- **GET** `/health` - Server health status

## Postman Testing

1. Server runs on: `http://localhost:5000`
2. Test endpoint: `http://localhost:5000/api/test`
3. Get weather: `http://localhost:5000/api/weather?city=London`
4. By coords: `http://localhost:5000/api/weather/coords?lat=51.5074&lon=-0.1278`
