"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Star, Mic, Volume2 } from "lucide-react"
import Link from "next/link"

export default function DictationPage() {
  const words = ["мама", "папа", "дом", "кот", "собака", "школа", "книга", "ручка", "стол", "стул"]

  const [currentWord, setCurrentWord] = useState(words[0])
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [listening, setListening] = useState(false)

  const speakWord = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord)
      utterance.lang = "ru-RU"
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    // Simulated voice input - in production would use Web Speech API
    setListening(true)
    setTimeout(() => {
      setListening(false)
      // Simulate user input
      const simulatedInput = Math.random() > 0.3 ? currentWord : words[Math.floor(Math.random() * words.length)]
      setUserAnswer(simulatedInput)
      checkAnswer(simulatedInput)
    }, 2000)
  }

  const checkAnswer = (answer: string) => {
    setShowResult(true)
    if (answer.toLowerCase() === currentWord.toLowerCase()) {
      setScore(score + 1)
      setTimeout(() => {
        const nextWord = words[Math.floor(Math.random() * words.length)]
        setCurrentWord(nextWord)
        setUserAnswer("")
        setShowResult(false)
      }, 1500)
    } else {
      setTimeout(() => {
        setUserAnswer("")
        setShowResult(false)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10 pb-24">
      <SubjectHeader title="Диктант" subtitle="Слушай и говори слово" color="accent" />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/russian">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Назад к русскому
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

        {/* Listen to Word */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-6">Послушай слово:</h3>
          <Button
            size="lg"
            className="w-32 h-32 rounded-full bg-accent hover:bg-accent/80 text-accent-foreground"
            onClick={speakWord}
          >
            <Volume2 className="w-16 h-16" />
          </Button>
        </div>

        {/* Voice Input */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-6">Скажи слово:</h3>
          <Button
            size="lg"
            className={`w-40 h-40 rounded-full ${
              listening ? "bg-destructive animate-pulse" : "bg-primary hover:bg-primary/80"
            }`}
            onClick={startListening}
            disabled={listening}
          >
            <Mic className="w-20 h-20" />
          </Button>

          {listening && <p className="text-xl font-semibold mt-4 text-primary">Слушаю... 🎤</p>}
        </div>

        {/* User Answer Display */}
        {userAnswer && (
          <div className="text-center mb-8">
            <div className="inline-block bg-card rounded-2xl px-8 py-4 shadow-lg">
              <p className="text-3xl font-bold">{userAnswer}</p>
            </div>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className="text-center">
            {userAnswer.toLowerCase() === currentWord.toLowerCase() ? (
              <div className="text-4xl font-bold text-success">Правильно! 🎉</div>
            ) : (
              <div>
                <div className="text-2xl font-bold text-destructive mb-2">Неправильно</div>
                <div className="text-xl text-muted-foreground">Правильно: {currentWord}</div>
              </div>
            )}
          </div>
        )}

        {/* Info */}
        <div className="mt-12 p-6 bg-warning/10 rounded-2xl border-2 border-warning/30">
          <p className="text-center text-muted-foreground">
            Нажми на динамик чтобы услышать слово, затем нажми на микрофон и произнеси его
          </p>
        </div>
      </main>
    </div>
  )
}
