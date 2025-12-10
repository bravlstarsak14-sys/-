"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

const seasons = [
  {
    name: "Зима",
    emoji: "❄️",
    bg: "from-blue-200 to-blue-100",
    description: "Холодно, идёт снег. Деревья без листьев. Дети катаются на санках.",
    months: ["Декабрь", "Январь", "Февраль"],
    activities: ["⛷️ Кататься на лыжах", "⛸️ Кататься на коньках", "☃️ Лепить снеговика"],
  },
  {
    name: "Весна",
    emoji: "🌸",
    bg: "from-green-200 to-yellow-100",
    description: "Тепло, тает снег. Распускаются цветы. Возвращаются птицы.",
    months: ["Март", "Апрель", "Май"],
    activities: ["🌱 Сажать цветы", "🚴 Кататься на велосипеде", "🪁 Запускать воздушного змея"],
  },
  {
    name: "Лето",
    emoji: "☀️",
    bg: "from-yellow-200 to-orange-100",
    description: "Жарко и солнечно. Всё цветёт. Можно купаться и загорать.",
    months: ["Июнь", "Июль", "Август"],
    activities: ["🏊 Купаться в речке", "🍓 Собирать ягоды", "⛺ Ходить в походы"],
  },
  {
    name: "Осень",
    emoji: "🍂",
    bg: "from-orange-200 to-red-100",
    description: "Прохладно, идут дожди. Листья желтеют и опадают.",
    months: ["Сентябрь", "Октябрь", "Ноябрь"],
    activities: ["🍄 Собирать грибы", "📚 Идти в школу", "🍁 Собирать листья"],
  },
]

export default function SeasonsGame() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % seasons.length)
  const prev = () => setCurrent((current - 1 + seasons.length) % seasons.length)

  const season = seasons[current]

  return (
    <div className="min-h-screen bg-gradient-to-b from-success/5 via-background to-background pb-24">
      <SubjectHeader title="Времена года" icon={Calendar} color="bg-success" />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className={`bg-gradient-to-br ${season.bg} rounded-3xl p-8 shadow-lg mb-6 transition-all duration-500`}>
          <div className="text-center mb-6">
            <div className="text-9xl mb-4 animate-bounce-in">{season.emoji}</div>
            <h2 className="text-5xl font-bold text-foreground mb-2">{season.name}</h2>
            <p className="text-xl text-foreground/80 leading-relaxed">{season.description}</p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prev}
              className="w-14 h-14 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <div className="text-center">
              <p className="text-foreground/70 font-semibold">Свайпай влево или вправо</p>
            </div>

            <button
              onClick={next}
              className="w-14 h-14 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Months */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {season.months.map((month) => (
              <div key={month} className="bg-white/80 rounded-2xl p-3 text-center font-bold text-foreground">
                {month}
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="bg-card rounded-3xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-foreground mb-4">Что делать {season.name.toLowerCase()}?</h3>
          <div className="space-y-3">
            {season.activities.map((activity, index) => (
              <div key={index} className="bg-muted rounded-2xl p-4 text-lg font-semibold text-foreground">
                {activity}
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
