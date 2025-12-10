"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Star } from "lucide-react"
import Link from "next/link"

export default function RulerPage() {
  const [score, setScore] = useState(0)
  const [targetLength, setTargetLength] = useState(Math.floor(Math.random() * 15) + 5)
  const [currentLength, setCurrentLength] = useState(0)
  const [measuring, setMeasuring] = useState(false)

  const handleMeasure = (length: number) => {
    setCurrentLength(length)
    if (Math.abs(length - targetLength) <= 1) {
      setScore(score + 1)
      setTimeout(() => {
        setTargetLength(Math.floor(Math.random() * 15) + 5)
        setCurrentLength(0)
        setMeasuring(false)
      }, 1000)
    }
  }

  const objects = [
    { name: "Карандаш", emoji: "✏️", size: 18 },
    { name: "Ластик", emoji: "🧽", size: 4 },
    { name: "Ручка", emoji: "🖊️", size: 14 },
    { name: "Кисточка", emoji: "🖌️", size: 20 },
    { name: "Линейка", emoji: "📏", size: 30 },
  ]

  const currentObject = objects.find((obj) => Math.abs(obj.size - targetLength) <= 2) || objects[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 pb-24">
      <SubjectHeader title="Измерения" subtitle="Виртуальная линейка" color="primary" />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/math">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Назад к математике
          </Button>
        </Link>

        {/* Score Display */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="bg-card rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-warning fill-warning" />
              <span className="text-3xl font-bold">{score}</span>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4">
            Измерь {currentObject.name} {currentObject.emoji}
          </h3>
          <p className="text-xl text-muted-foreground">Цель: {targetLength} см</p>
        </div>

        {/* Object to measure */}
        <div className="mb-8 flex justify-center">
          <div className="text-8xl p-4 bg-card rounded-2xl shadow-lg" style={{ width: `${targetLength * 10}px` }}>
            {currentObject.emoji}
          </div>
        </div>

        {/* Virtual Ruler */}
        <div className="bg-warning/20 p-6 rounded-3xl border-2 border-warning/40">
          <div className="bg-white rounded-xl p-4 shadow-inner">
            <div className="relative h-24 border-b-4 border-foreground">
              {/* Ruler markings */}
              {Array.from({ length: 31 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute cursor-pointer hover:bg-primary/20 transition-colors"
                  style={{ left: `${(i / 30) * 100}%` }}
                  onClick={() => handleMeasure(i)}
                >
                  <div className={`w-0.5 bg-foreground ${i % 5 === 0 ? "h-12" : i % 2 === 0 ? "h-8" : "h-6"}`} />
                  {i % 5 === 0 && (
                    <span className="absolute -bottom-6 left-0 text-xs font-bold -translate-x-1/2">{i}</span>
                  )}
                </div>
              ))}

              {/* Current measurement indicator */}
              {currentLength > 0 && (
                <div
                  className="absolute top-0 h-full bg-primary/30 border-r-4 border-primary transition-all"
                  style={{ width: `${(currentLength / 30) * 100}%` }}
                >
                  <div className="absolute -top-8 right-0 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    {currentLength} см
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-center mt-4 text-lg font-semibold">Тапай на линейке чтобы измерить</p>
        </div>

        {/* Result */}
        {currentLength > 0 && (
          <div className="mt-6 text-center">
            {Math.abs(currentLength - targetLength) <= 1 ? (
              <div className="text-3xl font-bold text-success">Правильно! 🎉</div>
            ) : (
              <div className="text-xl text-muted-foreground">
                {currentLength < targetLength ? "Еще немного больше" : "Немного меньше"}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
