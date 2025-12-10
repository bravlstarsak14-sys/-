"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Star } from "lucide-react"
import Link from "next/link"

export default function FractionsPage() {
  const [slices, setSlices] = useState(8)
  const [selectedSlices, setSelectedSlices] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState({ numerator: 1, denominator: 4 })
  const [cutting, setCutting] = useState(false)
  const [cutLine, setCutLine] = useState<{ start: { x: number; y: number }; end: { x: number; y: number } } | null>(
    null,
  )

  const handleSliceClick = (index: number) => {
    const newSelected = selectedSlices.includes(index)
      ? selectedSlices.filter((i) => i !== index)
      : [...selectedSlices, index]

    setSelectedSlices(newSelected)

    const targetSlices = (slices * question.numerator) / question.denominator
    if (newSelected.length === targetSlices) {
      setScore(score + 1)
      setTimeout(() => {
        generateNewQuestion()
        setSelectedSlices([])
      }, 1000)
    }
  }

  const generateNewQuestion = () => {
    const denominators = [2, 4, 8]
    const denom = denominators[Math.floor(Math.random() * denominators.length)]
    const numer = Math.floor(Math.random() * denom) + 1
    setQuestion({ numerator: numer, denominator: denom })
    setSlices(8)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 pb-24">
      <SubjectHeader title="Дроби" subtitle="Режь пиццу на части" color="primary" />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/math">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Назад к математике
          </Button>
        </Link>

        <div className="flex justify-center gap-8 mb-8">
          <div className="bg-card rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-warning fill-warning" />
              <span className="text-3xl font-bold">{score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-2">
            Выбери{" "}
            <span className="text-primary">
              {question.numerator}/{question.denominator}
            </span>{" "}
            пиццы
          </h3>
          <p className="text-muted-foreground">Тапай на кусочки чтобы выбрать их</p>
        </div>

        <div className="relative w-80 h-80 mx-auto mb-8">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="90" fill="#FFA500" stroke="#FF8C00" strokeWidth="3" />
            <circle cx="100" cy="100" r="85" fill="#FFD700" />

            {Array.from({ length: slices }).map((_, i) => {
              const angle = (360 / slices) * i
              const nextAngle = (360 / slices) * (i + 1)
              const isSelected = selectedSlices.includes(i)

              return (
                <g key={i}>
                  <path
                    d={`M 100 100 L ${100 + 85 * Math.cos((angle * Math.PI) / 180)} ${
                      100 + 85 * Math.sin((angle * Math.PI) / 180)
                    } A 85 85 0 0 1 ${100 + 85 * Math.cos((nextAngle * Math.PI) / 180)} ${
                      100 + 85 * Math.sin((nextAngle * Math.PI) / 180)
                    } Z`}
                    fill={isSelected ? "#FF6B6B" : "transparent"}
                    stroke="#8B4513"
                    strokeWidth="2"
                    className="cursor-pointer hover:opacity-80 transition-all"
                    onClick={() => handleSliceClick(i)}
                  />
                  {[1, 2].map((p) => {
                    const r = 40 + p * 20
                    const a = angle + (360 / slices / 3) * p
                    return (
                      <circle
                        key={`${i}-${p}`}
                        cx={100 + r * Math.cos((a * Math.PI) / 180)}
                        cy={100 + r * Math.sin((a * Math.PI) / 180)}
                        r="6"
                        fill="#DC143C"
                        stroke="#8B0000"
                        strokeWidth="1"
                        pointerEvents="none"
                      />
                    )
                  })}
                </g>
              )
            })}
          </svg>
        </div>

        <div className="text-center">
          <p className="text-xl text-muted-foreground">
            Выбрано: {selectedSlices.length} из {(slices * question.numerator) / question.denominator}
          </p>
        </div>
      </main>
    </div>
  )
}
