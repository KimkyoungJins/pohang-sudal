import { NextResponse } from "next/server";

const POHANG_LAT = 36.019;
const POHANG_LON = 129.343;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

let cache: { data: unknown; timestamp: number } | null = null;

export async function GET() {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Weather API not configured" },
      { status: 503 }
    );
  }

  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${POHANG_LAT}&lon=${POHANG_LON}&units=metric&appid=${apiKey}`
    );
    if (!res.ok) throw new Error("OpenWeatherMap API error");

    const json = await res.json();
    const data = {
      temp: json.main.temp,
      feelsLike: json.main.feels_like,
      description: json.weather[0].description,
      icon: json.weather[0].icon,
    };

    cache = { data, timestamp: Date.now() };
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
