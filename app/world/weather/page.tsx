"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Star, Cloud, CloudRain, Sun, CloudSnow, Wind } from "lucide-react"
import Link from "next/link"

export default function WeatherPage() {
  const [weather, setWeather] = useState<"sun" | "rain" | "snow" | "wind">("sun")
  const [score, setScore] = useState(0)

  const weatherOptions = [
    { type: "sun" as const, icon: Sun, label: "Солнце", color: "text-warning" },
    { type: "rain" as const, icon: CloudRain, label: "Дождь", color: "text-primary" },
    { type: "snow" as const, icon: CloudSnow, label: "Снег", color: "text-blue-400" },
    { type: "wind" as const, icon: Wind, label: "Ветер", color: "text-muted-foreground" },
  ]

  const handleWeatherChange = (newWeather: typeof weather) => {
    setWeather(newWeather)
    setScore(score + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-success/10 pb-24">
      <SubjectHeader title="Погода" subtitle="Создавай погоду" color="success" />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/world">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Назад к окружающему миру
          </Button>
        </Link>

        {/* Score */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="bg-card rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-warning fill-warning" />
              <span className="text-3xl font-bold">{score}</span>
            </div>
          </div>
        </div>

        {/* Weather Display */}
        <div
          className={`relative h-96 rounded-3xl mb-8 overflow-hidden ${
            weather === "sun"
              ? "bg-gradient-to-b from-sky-300 to-sky-500"
              : weather === "rain"
                ? "bg-gradient-to-b from-gray-400 to-gray-600"
                : weather === "snow"
                  ? "bg-gradient-to-b from-blue-200 to-blue-400"
                  : "bg-gradient-to-b from-gray-300 to-gray-500"
          }`}
        >
          {/* Weather Animation */}
          {weather === "sun" && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2">
              <Sun className="w-32 h-32 text-warning animate-spin-slow" />
            </div>
          )}

          {weather === "rain" && (
            <div className="absolute inset-0">
              <Cloud className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 text-gray-700" />
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-4 bg-blue-400 animate-fall"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          )}

          {weather === "snow" && (
            <div className="absolute inset-0">
              <CloudSnow className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 text-white" />
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full animate-fall-slow"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
          )}

          {weather === "wind" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Wind className="w-40 h-40 text-gray-600 animate-pulse" />
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-0.5 bg-gray-400 animate-slide-right"
                  style={{
                    top: `${20 + i * 8}%`,
                    left: "-20%",
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Ground */}
          <div className="absolute bottom-0 w-full h-20 bg-green-600" />
        </div>

        {/* Weather Controls */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-center">Выбери погоду:</h3>
          <div className="grid grid-cols-2 gap-4">
            {weatherOptions.map((option) => {
              const Icon = option.icon
              return (
                <Button
                  key={option.type}
                  size="lg"
                  variant={weather === option.type ? "default" : "outline"}
                  className="h-24 text-xl font-bold"
                  onClick={() => handleWeatherChange(option.type)}
                >
                  <Icon className={`w-8 h-8 mr-2 ${option.color}`} />
                  {option.label}
                </Button>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
