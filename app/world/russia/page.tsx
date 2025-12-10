"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Star } from "lucide-react"
import Link from "next/link"

export default function RussiaMapPage() {
  const [score, setScore] = useState(0)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const regions = [
    { name: "Москва", emoji: "🏛️", fact: "Столица России, здесь Красная площадь и Кремль" },
    { name: "Санкт-Петербург", emoji: "🌉", fact: "Город на Неве с разводными мостами" },
    { name: "Сочи", emoji: "🏖️", fact: "Южный курорт, здесь прошла Олимпиада 2014" },
    { name: "Казань", emoji: "🕌", fact: "Столица Татарстана со старинным Кремлём" },
    { name: "Владивосток", emoji: "⚓", fact: "Город на берегу Тихого океана" },
    { name: "Байкал", emoji: "💧", fact: "Самое глубокое озеро в мире" },
  ]

  const handleRegionClick = (region: (typeof regions)[0]) => {
    setSelectedRegion(region.name)
    setScore(score + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-success/10 pb-24">
      <SubjectHeader title="Карта России" subtitle="Узнай о регионах" color="success" />

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

        {/* Map */}
        <div className="bg-card rounded-3xl p-8 shadow-lg mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Тапни на регион чтобы узнать о нём:</h3>

          {/* Simplified Russia Map */}
          <div className="relative bg-success/10 rounded-2xl p-8 min-h-96">
            <svg viewBox="0 0 800 400" className="w-full h-full">
              {/* Simplified Russia outline */}
              <path
                d="M 100 200 L 150 150 L 250 140 L 350 160 L 450 140 L 550 150 L 650 170 L 700 160 L 700 240 L 650 250 L 550 240 L 450 260 L 350 250 L 250 260 L 150 250 Z"
                fill="#90EE90"
                stroke="#2D5016"
                strokeWidth="3"
              />

              {/* Region markers */}
              {regions.map((region, index) => {
                const positions = [
                  { x: 200, y: 200 }, // Moscow
                  { x: 180, y: 180 }, // St. Petersburg
                  { x: 250, y: 280 }, // Sochi
                  { x: 350, y: 220 }, // Kazan
                  { x: 650, y: 200 }, // Vladivostok
                  { x: 500, y: 180 }, // Baikal
                ]

                return (
                  <g
                    key={region.name}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleRegionClick(region)}
                  >
                    <circle
                      cx={positions[index].x}
                      cy={positions[index].y}
                      r="30"
                      fill={selectedRegion === region.name ? "#FF6B6B" : "#FFA500"}
                      stroke="#8B4513"
                      strokeWidth="2"
                    />
                    <text
                      x={positions[index].x}
                      y={positions[index].y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="28"
                    >
                      {region.emoji}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>

        {/* Selected Region Info */}
        {selectedRegion && (
          <div className="bg-card rounded-3xl p-8 shadow-lg border-4 border-success/30 animate-bounce-in">
            <div className="text-center">
              <div className="text-6xl mb-4">{regions.find((r) => r.name === selectedRegion)?.emoji}</div>
              <h4 className="text-3xl font-bold mb-4">{selectedRegion}</h4>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {regions.find((r) => r.name === selectedRegion)?.fact}
              </p>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!selectedRegion && (
          <div className="text-center text-muted-foreground text-lg">
            Нажми на любую точку на карте чтобы узнать интересные факты
          </div>
        )}
      </main>
    </div>
  )
}
