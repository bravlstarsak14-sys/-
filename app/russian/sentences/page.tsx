"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Star } from "lucide-react"
import Link from "next/link"

export default function SentencesPage() {
  const sentences = [
    { words: ["Мама", "мыла", "раму"], correct: ["Мама", "мыла", "раму"] },
    { words: ["идёт", "Дождь", "сильный"], correct: ["Дождь", "идёт", "сильный"] },
    { words: ["любит", "Кошка", "молоко"], correct: ["Кошка", "любит", "молоко"] },
    { words: ["в", "Дети", "играют", "парке"], correct: ["Дети", "играют", "в", "парке"] },
    { words: ["летом", "жарко", "Очень"], correct: ["Очень", "жарко", "летом"] },
  ]

  const [currentSentence, setCurrentSentence] = useState(0)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [availableWords, setAvailableWords] = useState([...sentences[0].words].sort(() => Math.random() - 0.5))
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleWordClick = (word: string, fromAvailable: boolean) => {
    if (fromAvailable) {
      setSelectedWords([...selectedWords, word])
      setAvailableWords(
        availableWords.filter((w, i) => availableWords.indexOf(word) !== i || i !== availableWords.indexOf(word)),
      )
    } else {
      const index = selectedWords.indexOf(word)
      setAvailableWords([...availableWords, word])
      setSelectedWords(selectedWords.filter((_, i) => i !== index))
    }
  }

  const checkAnswer = () => {
    const isCorrect = selectedWords.join(" ") === sentences[currentSentence].correct.join(" ")
    setShowResult(true)

    if (isCorrect) {
      setScore(score + 1)
      setTimeout(() => {
        const nextSentence = (currentSentence + 1) % sentences.length
        setCurrentSentence(nextSentence)
        setSelectedWords([])
        setAvailableWords([...sentences[nextSentence].words].sort(() => Math.random() - 0.5))
        setShowResult(false)
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10 pb-24">
      <SubjectHeader title="Предложения" subtitle="Расставь слова правильно" color="accent" />

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

        {/* Selected Words Area */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">Составь предложение:</h3>
          <div className="min-h-32 bg-card rounded-2xl p-6 border-4 border-dashed border-accent/30 flex flex-wrap gap-3 items-center justify-center">
            {selectedWords.length === 0 ? (
              <p className="text-muted-foreground text-lg">Тапай на слова снизу</p>
            ) : (
              selectedWords.map((word, index) => (
                <Button
                  key={`${word}-${index}`}
                  size="lg"
                  variant="secondary"
                  className="text-2xl font-bold px-6 py-6 h-auto"
                  onClick={() => handleWordClick(word, false)}
                >
                  {word}
                </Button>
              ))
            )}
          </div>
        </div>

        {/* Available Words */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">Слова:</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {availableWords.map((word, index) => (
              <Button
                key={`${word}-${index}`}
                size="lg"
                className="text-2xl font-bold px-6 py-6 h-auto bg-accent hover:bg-accent/80"
                onClick={() => handleWordClick(word, true)}
              >
                {word}
              </Button>
            ))}
          </div>
        </div>

        {/* Check Button */}
        {selectedWords.length === sentences[currentSentence].words.length && !showResult && (
          <div className="flex justify-center">
            <Button size="lg" className="text-xl font-bold px-8 py-6 h-auto" onClick={checkAnswer}>
              Проверить
            </Button>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className="text-center">
            {selectedWords.join(" ") === sentences[currentSentence].correct.join(" ") ? (
              <div className="text-4xl font-bold text-success">Отлично! 🎉</div>
            ) : (
              <div className="text-2xl font-bold text-destructive">Попробуй ещё раз</div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
