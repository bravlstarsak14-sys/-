"use client"

import { useState, useEffect } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { SubtitlesIcon as MultiplyIcon } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

export default function MultiplicationGame() {
  const [num1, setNum1] = useState(2)
  const [num2, setNum2] = useState(3)
  const [options, setOptions] = useState<number[]>([])
  const [stars, setStars] = useState(0)
  const [streak, setStreak] = useState(0)
  const [message, setMessage] = useState("")

  useEffect(() => {
    generateQuestion()
  }, [])

  const generateQuestion = () => {
    const a = Math.floor(Math.random() * 9) + 2 // 2-10
    const b = Math.floor(Math.random() * 9) + 2
    const correct = a * b

    setNum1(a)
    setNum2(b)
    setMessage("")

    // Generate options with correct answer and 3 wrong ones
    const wrongOptions = new Set<number>()
    while (wrongOptions.size < 3) {
      const wrong = correct + Math.floor(Math.random() * 20) - 10
      if (wrong !== correct && wrong > 0) {
        wrongOptions.add(wrong)
      }
    }

    const allOptions = [correct, ...Array.from(wrongOptions)]
    setOptions(allOptions.sort(() => Math.random() - 0.5))
  }

  const handleAnswer = (answer: number) => {
    const correct = num1 * num2

    if (answer === correct) {
      const earnedStars = 5 + streak * 2
      setStars((prev) => prev + earnedStars)
      setStreak((prev) => prev + 1)
      setMessage(`Правильно! +${earnedStars} ⭐`)
      setTimeout(() => generateQuestion(), 1500)
    } else {
      setStreak(0)
      setMessage(`Неверно! Правильный ответ: ${correct}`)
      setTimeout(() => generateQuestion(), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background pb-24">
      <SubjectHeader title="Таблица умножения" icon={MultiplyIcon} color="bg-primary" stars={stars} />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Streak */}
        {streak > 0 && (
          <div className="bg-warning/20 rounded-2xl p-4 mb-6 text-center animate-bounce-in">
            <p className="text-warning-foreground font-bold text-lg">Серия правильных ответов: {streak} 🔥</p>
          </div>
        )}

        {/* Question */}
        <div className="bg-card rounded-3xl p-8 shadow-lg mb-6">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="text-7xl font-bold text-primary">{num1}</div>
            <MultiplyIcon className="w-12 h-12 text-muted-foreground" />
            <div className="text-7xl font-bold text-primary">{num2}</div>
            <div className="text-7xl font-bold text-muted-foreground">=</div>
            <div className="text-7xl font-bold text-accent">?</div>
          </div>

          <p className="text-center text-muted-foreground text-lg">Выбери правильный ответ</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="bg-card hover:bg-primary/10 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <div className="text-5xl font-bold text-foreground text-center">{option}</div>
            </button>
          ))}
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-6 rounded-2xl text-center font-bold text-xl animate-bounce-in ${
              message.includes("Правильно")
                ? "bg-success/20 text-success-foreground"
                : "bg-destructive/20 text-destructive-foreground"
            }`}
          >
            {message}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
