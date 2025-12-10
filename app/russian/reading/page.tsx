"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Star, ChevronRight, BookOpen } from "lucide-react"
import Link from "next/link"

export default function ReadingPage() {
  const story = {
    title: "Репка",
    pages: [
      {
        text: "Посадил дед репку.",
        image: "🧓🌱",
      },
      {
        text: "Выросла репка большая-пребольшая!",
        image: "🌿",
      },
      {
        text: "Стал дед репку из земли тащить. Тянет-потянет, вытянуть не может!",
        image: "🧓💪",
      },
      {
        text: "Позвал дед бабку. Бабка за дедку, дедка за репку — тянут-потянут, вытянуть не могут!",
        image: "👵🧓",
      },
      {
        text: "Позвала бабка внучку. Внучка за бабку, бабка за дедку, дедка за репку — тянут-потянут, вытянуть не могут!",
        image: "👧👵🧓",
      },
      {
        text: "Вытянули репку! 🎉",
        image: "🥕✨",
      },
    ],
  }

  const [currentPage, setCurrentPage] = useState(0)
  const [score, setScore] = useState(0)

  const nextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1)
      setScore(score + 1)
    }
  }

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10 pb-24">
      <SubjectHeader title="Чтение" subtitle="Интерактивная книжка" icon={BookOpen} color="bg-accent" stars={score} />

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

        {/* Book Title */}
        <h2 className="text-4xl font-bold text-center mb-8">{story.title}</h2>

        {/* Book Page */}
        <div className="bg-card rounded-3xl p-8 shadow-2xl border-4 border-accent/20 mb-8 min-h-96">
          {/* Image */}
          <div className="text-9xl text-center mb-8 animate-bounce-in">{story.pages[currentPage].image}</div>

          {/* Text */}
          <p className="text-2xl leading-relaxed text-center font-semibold">{story.pages[currentPage].text}</p>

          {/* Page Number */}
          <div className="text-center mt-8 text-muted-foreground">
            Страница {currentPage + 1} из {story.pages.length}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            size="lg"
            variant="outline"
            onClick={previousPage}
            disabled={currentPage === 0}
            className="h-16 bg-transparent"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <div className="flex gap-2">
            {story.pages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentPage ? "bg-accent" : index < currentPage ? "bg-success" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <Button
            size="lg"
            onClick={nextPage}
            disabled={currentPage === story.pages.length - 1}
            className="h-16 bg-accent hover:bg-accent/80"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>

        {/* Completion Message */}
        {currentPage === story.pages.length - 1 && (
          <div className="mt-8 text-center">
            <div className="text-4xl font-bold text-success mb-4">Сказка прочитана! 📖✨</div>
            <Button
              size="lg"
              onClick={() => {
                setCurrentPage(0)
              }}
              className="bg-accent hover:bg-accent/80"
            >
              Прочитать ещё раз
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
