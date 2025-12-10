"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SubjectHeader } from "@/components/subject-header"
import { GraduationCap, Send, X } from "lucide-react"

const mathTopics = [
  "Сложение и вычитание до 20",
  "Таблица умножения 2-5",
  "Таблица умножения 6-9",
  "Дроби: половина и четверть",
  "Геометрия: плоские фигуры",
  "Геометрия: объёмные фигуры",
  "Измерения: длина",
  "Решение задач",
]

const russianTopics = [
  "Азбука А-Й",
  "Азбука К-Т",
  "Азбука У-Я",
  "Слоги и слова",
  "Составление предложений",
  "Чтение по слогам",
  "Интерактивная книга: сказка",
]

const worldTopics = [
  "Времена года",
  "Домашние животные",
  "Дикие животные",
  "Растения: от семечка до цветка",
  "Погода и природа",
  "Карта России",
]

const englishTopics = ["Room words", "Colors", "Numbers 1-10", "Animals", "Simple dialogues"]

export default function AssignLesson() {
  const router = useRouter()
  const [subject, setSubject] = useState("Математика")
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState("medium")

  const topics = {
    Математика: mathTopics,
    "Русский язык": russianTopics,
    "Окружающий мир": worldTopics,
    English: englishTopics,
  }

  const currentTopics = topics[subject as keyof typeof topics] || mathTopics

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
  }

  const handleAssign = () => {
    alert(`Задание отправлено!\nПредмет: ${subject}\nТемы: ${selectedTopics.length}\nСложность: ${difficulty}`)
    router.push("/teacher")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 via-background to-background">
      <SubjectHeader title="Задать урок" icon={GraduationCap} color="bg-foreground" />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Subject Selection */}
        <div className="bg-card rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Выберите предмет</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.keys(topics).map((subj) => (
              <button
                key={subj}
                onClick={() => {
                  setSubject(subj)
                  setSelectedTopics([])
                }}
                className={`px-4 py-3 rounded-2xl font-bold transition-all ${
                  subject === subj
                    ? "bg-primary text-primary-foreground scale-105 shadow-lg"
                    : "bg-muted text-foreground hover:bg-muted/70"
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Selection */}
        <div className="bg-card rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Выберите темы</h3>
          <div className="space-y-2">
            {currentTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => toggleTopic(topic)}
                className={`w-full text-left px-4 py-3 rounded-2xl font-semibold transition-all ${
                  selectedTopics.includes(topic)
                    ? "bg-success/20 text-success-foreground border-2 border-success"
                    : "bg-muted text-foreground hover:bg-muted/70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{topic}</span>
                  {selectedTopics.includes(topic) && <span className="text-2xl">✓</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="bg-card rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Уровень сложности</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "easy", label: "Легко", color: "success" },
              { value: "medium", label: "Средне", color: "warning" },
              { value: "hard", label: "Сложно", color: "destructive" },
            ].map((level) => (
              <button
                key={level.value}
                onClick={() => setDifficulty(level.value)}
                className={`px-4 py-3 rounded-2xl font-bold transition-all ${
                  difficulty === level.value
                    ? `bg-${level.color} text-white scale-105 shadow-lg`
                    : "bg-muted text-foreground hover:bg-muted/70"
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-muted text-foreground rounded-2xl font-bold hover:bg-muted/70 transition-colors"
          >
            <X className="w-6 h-6" />
            Отмена
          </button>
          <button
            onClick={handleAssign}
            disabled={selectedTopics.length === 0}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-6 h-6" />
            Раздать задание ({selectedTopics.length})
          </button>
        </div>
      </main>
    </div>
  )
}
