import {
  TypographyH3,
  TypographyH4,
  TypographyLarge,
  TypographyMuted,
  TypographyP,
} from "@/components/ui/typography";
import Image from "next/image";
import { SelectCity } from "./select-city";

function kelvinToCelsius(kelvin: number) {
  return Math.round(kelvin - 273.15);
}

interface Weather {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

export default async function Home() {
  const weather: Weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  return (
    <div className="min-h-screen flex items-center justify-center gap-4 flex-col bg-stone-50">
      <div className="flex flex-col gap-4 justify-center items-center p-8">
        <SelectCity />
        <div className="flex flex-col items-center gap-1">
          <p className="text-9xl font-bold">
            {kelvinToCelsius(weather.main.temp)}
            <span className="text-base font-normal -ml-3">°C</span>
          </p>
          <p>{weather.weather[0].main}</p>
        </div>
      </div>
    </div>
  );
}
