"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  feelsLike: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => {
        if (!res.ok) throw new Error("Weather unavailable");
        return res.json();
      })
      .then((data) => {
        if (data.temp !== undefined) setWeather(data);
      })
      .catch(() => {});
  }, []);

  if (!weather) return null;

  return (
    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
        alt={weather.description}
        className="w-8 h-8"
      />
      <span className="font-medium">{Math.round(weather.temp)}°C</span>
      <span className="text-white/70 hidden sm:inline">
        Pohang · {weather.description}
      </span>
    </div>
  );
}
