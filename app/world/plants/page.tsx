"use client"

import { useState, useEffect } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Flower2, Droplet, Sun, RotateCcw } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

const stages = [
  { name: "Семечко", emoji: "🌰", description: "Посади семечко в землю", progress: 0 },
  { name: "Росток", emoji: "🌱", description: "Поливай водой каждый день", progress: 25 },
  { name: "Растение", emoji: "🪴", description: "Не забывай про солнечный свет", progress: 50 },
  { name: "Бутон", emoji: "🌿", description: "Скоро появится цветок!", progress: 75 },
  { name: "Цветок", emoji: "🌸", description: "Поздравляем! Цветок вырос!", progress: 100 },
]

export default function PlantsGame() {
  const [stage, setStage] = useState(0)
  const [water, setWater] = useState(50)
  const [sun, setSun] = useState(50)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setWater((prev) => Math.max(0, prev - 1))
      setSun((prev) => Math.max(0, prev - 0.5))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (water < 20 || sun < 20) {
      setMessage("Растению нужна вода и солнце!")
    } else {
      setMessage("")
    }
  }, [water, sun])

  const addWater = () => {
    setWater((prev) => Math.min(100, prev + 20))
    checkGrowth()
  }

  const addSun = () => {
    setSun((prev) => Math.min(100, prev + 20))
    checkGrowth()
  }

  const checkGrowth = () => {
    if (water > 60 && sun > 60 && stage < stages.length - 1) {
      setTimeout(() => {
        setStage((prev) => prev + 1)
        setMessage("Растение растёт! +15 звёзд")
        setTimeout(() => setMessage(""), 2000)
      }, 500)
    }
  }

  const reset = () => {
    setStage(0)
    setWater(50)
    setSun(50)
    setMessage("")
  }

  const current = stages[stage] || stages[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-success/5 via-background to-background pb-24">
      <SubjectHeader title="Вырасти цветок" icon={Flower2} color="bg-success" />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Plant Stage */}
        <div className="bg-gradient-to-b from-success/10 to-success/5 rounded-3xl p-8 shadow-lg mb-6">
          <div className="text-center">
            <div className="text-9xl mb-4 animate-bounce-in">{current.emoji}</div>
            <h2 className="text-3xl font-bold text-foreground mb-2">{current.name}</h2>
            <p className="text-lg text-muted-foreground">{current.description}</p>

            {/* Progress */}
            <div className="mt-6 bg-white/80 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-success transition-all duration-500"
                style={{ width: `${current.progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">Прогресс: {current.progress}%</p>
          </div>
        </div>

        {/* Resources */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Water */}
          <div className="bg-card rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Droplet className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-bold text-foreground">Вода</h3>
            </div>
            <div className="bg-muted rounded-full h-3 overflow-hidden mb-3">
              <div className="h-full bg-blue-500 transition-all" style={{ width: `${water}%` }} />
            </div>
            <button
              onClick={addWater}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all"
            >
              Полить
            </button>
          </div>

          {/* Sun */}
          <div className="bg-card rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="w-6 h-6 text-yellow-500" />
              <h3 className="text-lg font-bold text-foreground">Солнце</h3>
            </div>
            <div className="bg-muted rounded-full h-3 overflow-hidden mb-3">
              <div className="h-full bg-yellow-500 transition-all" style={{ width: `${sun}%` }} />
            </div>
            <button
              onClick={addSun}
              className="w-full px-4 py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 active:scale-95 transition-all"
            >
              Добавить
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-2xl text-center font-bold mb-4 animate-bounce-in ${
              message.includes("растёт")
                ? "bg-success/20 text-success-foreground"
                : "bg-warning/20 text-warning-foreground"
            }`}
          >
            {message}
          </div>
        )}

        {/* Reset */}
        {stage === stages.length - 1 && (
          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg"
          >
            <RotateCcw className="w-6 h-6" />
            Вырастить новый цветок
          </button>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
