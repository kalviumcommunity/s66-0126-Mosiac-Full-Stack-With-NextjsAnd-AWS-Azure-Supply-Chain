import { NextRequest, NextResponse } from 'next/server';

const WEATHER_SERVER = process.env.WEATHER_SERVER_URL || 'http://localhost:5000';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');

    if (!city) {
      return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
    }

    const response = await fetch(`${WEATHER_SERVER}/api/forecast?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();

    // Process forecast data to get daily trends
    const dailyData: { [key: string]: { temps: number[]; count: number } } = {};

    if (data.list && Array.isArray(data.list)) {
      data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        if (!dailyData[dayKey]) {
          dailyData[dayKey] = { temps: [], count: 0 };
        }
        
        dailyData[dayKey].temps.push(item.main.temp);
        dailyData[dayKey].count++;
      });
    }

    // Convert to array and calculate daily averages, sorted by date
    const trendData = Object.entries(dailyData)
      .map(([date, data]) => ({
        date,
        avgTemp: Math.round((data.temps.reduce((a, b) => a + b, 0) / data.temps.length) * 10) / 10,
        maxTemp: Math.round(Math.max(...data.temps) * 10) / 10,
        minTemp: Math.round(Math.min(...data.temps) * 10) / 10,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 7); // Get last 7 days

    return NextResponse.json({
      city: data.city?.name || city,
      country: data.city?.country,
      trend: trendData,
    });
  } catch (error) {
    console.error('Error fetching trend data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trend data' },
      { status: 500 }
    );
  }
}
