"use client"

import { useState, useEffect } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { PuzzleIcon, RotateCcw } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

const words = [
  { word: "КОТ", syllables: ["КО", "Т"], emoji: "🐱" },
  { word: "РЫ-БА", syllables: ["РЫ", "БА"], emoji: "🐟" },
  { word: "МА-МА", syllables: ["МА", "МА"], emoji: "👩" },
  { word: "ДОМ", syllables: ["ДОМ"], emoji: "🏠" },
  { word: "ЛУ-НА", syllables: ["ЛУ", "НА"], emoji: "🌙" },
  { word: "СО-ВА", syllables: ["СО", "ВА"], emoji: "🦉" },
  { word: "МЯЧ", syllables: ["МЯЧ"], emoji: "⚽" },
  { word: "ЛИ-СА", syllables: ["ЛИ", "СА"], emoji: "🦊" },
]

export default function WordsGame() {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [shuffled, setShuffled] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [stars, setStars] = useState(0)
  const [message, setMessage] = useState("")

  useEffect(() => {
    newWord()
  }, [])

  const newWord = () => {
    const word = words[Math.floor(Math.random() * words.length)]
    setCurrentWord(word)
    setShuffled([...word.syllables].sort(() => Math.random() - 0.5))
    setSelected([])
    setMessage("")
  }

  const handleSyllableClick = (syllable: string, index: number) => {
    setSelected([...selected, syllable])
    setShuffled(shuffled.filter((_, i) => i !== index))

    const newSelected = [...selected, syllable]
    if (newSelected.length === currentWord.syllables.length) {
      if (newSelected.join("") === currentWord.syllables.join("")) {
        setMessage("Отлично! +10 звёзд")
        setStars((prev) => prev + 10)
        setTimeout(() => newWord(), 2000)
      } else {
        setMessage("Попробуй ещё раз")
        setTimeout(() => {
          setShuffled([...currentWord.syllables].sort(() => Math.random() - 0.5))
          setSelected([])
          setMessage("")
        }, 1500)
      }
    }
  }

  const handleReset = () => {
    setShuffled([...currentWord.syllables].sort(() => Math.random() - 0.5))
    setSelected([])
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/5 via-background to-background pb-24">
      <SubjectHeader title="Собери слово" icon={PuzzleIcon} color="bg-accent" stars={stars} />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="bg-card rounded-3xl p-8 shadow-lg mb-6 text-center">
          <div className="text-8xl mb-4 animate-bounce-in">{currentWord.emoji}</div>
          <p className="text-muted-foreground text-lg mb-4">Собери слово из слогов</p>

          {/* Selected syllables */}
          <div className="flex items-center justify-center gap-2 min-h-[80px] mb-6">
            {selected.length === 0 ? (
              <div className="text-muted-foreground">Выбери слоги</div>
            ) : (
              selected.map((syllable, index) => (
                <div
                  key={index}
                  className="px-6 py-4 bg-accent text-accent-foreground rounded-2xl font-bold text-3xl animate-bounce-in"
                >
                  {syllable}
                </div>
              ))
            )}
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-muted text-foreground rounded-xl font-semibold flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Сбросить
          </button>
        </div>

        {/* Available syllables */}
        <div className="bg-muted/50 rounded-3xl p-6 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4 text-center">Слоги</h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {shuffled.map((syllable, index) => (
              <button
                key={index}
                onClick={() => handleSyllableClick(syllable, index)}
                className="px-8 py-6 bg-card hover:bg-primary/10 rounded-2xl font-bold text-3xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                {syllable}
              </button>
            ))}
          </div>
        </div>

        {message && (
          <div
            className={`p-6 rounded-2xl text-center font-bold text-xl animate-bounce-in ${
              message.includes("Отлично")
                ? "bg-success/20 text-success-foreground"
                : "bg-warning/20 text-warning-foreground"
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
