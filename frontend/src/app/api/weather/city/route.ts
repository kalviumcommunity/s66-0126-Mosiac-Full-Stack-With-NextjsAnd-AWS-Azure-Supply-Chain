import { NextRequest, NextResponse } from 'next/server';

const WEATHER_SERVER = process.env.WEATHER_SERVER_URL || 'http://localhost:5000';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');

    if (!city) {
      return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
    }

    const response = await fetch(`${WEATHER_SERVER}/api/weather?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
