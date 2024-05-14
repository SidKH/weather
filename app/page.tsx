import Image from "next/image";
import { headers } from "next/headers";
import {
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";

function kelvinToCelsius(kelvin: number) {
  return Math.round(kelvin - 273.15);
}

interface Weather {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
}

const weatherEmojis: { [key: string]: string } = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Snow: "❄️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Fog: "🌫️",
  Mist: "🌫️",
  Smoke: "💨",
  Haze: "🌫️",
  Dust: "💨",
  Sand: "💨",
  Ash: "💨",
  Squall: "🌬️",
  Tornado: "🌪️",
};

export default async function Home() {
  const latitude = headers().get("x-latitude") || "37.1289771";
  const longitude = headers().get("x-longitude") || "-84.0832646";

  const weather: Weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  return (
    <div className="min-h-screen flex items-center justify-center gap-4 flex-col">
      <div className="flex flex-col gap-4 justify-center items-center p-8">
        <div className="flex flex-col items-center relative">
          <p className="text-6xl mb-2">
            {weatherEmojis[weather.weather[0].main]}
          </p>
          <p className="text-9xl font-bold flex items-start relative">
            <span>{kelvinToCelsius(weather.main.temp)}</span>
            <span className="text-base font-normal absolute right-0 top-0">
              °C
            </span>
          </p>
          <p className="mt-4">{weather.name} </p>
        </div>
      </div>
    </div>
  );
}
