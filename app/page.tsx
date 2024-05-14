import Image from "next/image";
import { headers } from "next/headers";

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
  const forwardedFor = headers().get("x-forwarded-for");

  console.log(forwardedFor, 999);

  const weather: Weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=40.6501&lon=-8.6502&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  return (
    <div className="min-h-screen flex items-center justify-center gap-4 flex-col">
      <div className="flex flex-col gap-4 justify-center items-center p-8">
        <div className="flex flex-col items-center relative">
          <p className="text-9xl font-bold flex items-start">
            <span>{kelvinToCelsius(weather.main.temp)}</span>
            <span className="text-base font-normal absolute right-0 top-0">
              °C
            </span>
          </p>
          <p className="text-4xl">{weatherEmojis[weather.weather[0].main]}</p>
          <p className="mt-6">{weather.name}</p>
        </div>
      </div>
    </div>
  );
}
