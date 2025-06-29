import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { city } = await req.json();
        const GEO_API_KEY = process.env.OPEN_WEATHER_API_KEY!;

        const geoRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${GEO_API_KEY}`);
        const geoData = await geoRes.json();

        if (!geoData || geoData.length === 0) {
            return NextResponse.json({
                data: null,
                success: false,
                message: "Failed to fetch weather data",
                error: "City not found"
            }, { status: 404 });
        }

        const { lat, lon } = geoData[0];
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${GEO_API_KEY}&units=metric`);
        const weatherData = await weatherRes.json();

        return NextResponse.json({
            data: weatherData,
            success: true,
            message: "Weather data fetched successfully",
            error: null
        });
    } catch (error) {
        return NextResponse.json({
            data: null,
            success: false,
            message: "Failed to fetch weather data",
            error: error
        });
    }
}
