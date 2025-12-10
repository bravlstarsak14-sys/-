"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Star } from "lucide-react"
import Link from "next/link"

export default function DialoguesPage() {
  const dialogues = [
    {
      situation: "Знакомство",
      emoji: "👋",
      conversation: [
        { speaker: "Person", text: "Hello! What is your name?", russian: "Привет! Как тебя зовут?" },
        {
          speaker: "You",
          options: [
            { text: "My name is Alex", russian: "Меня зовут Алекс", correct: true },
            { text: "I am happy", russian: "Я счастлив", correct: false },
            { text: "Goodbye", russian: "До свидания", correct: false },
          ],
        },
        { speaker: "Person", text: "Nice to meet you!", russian: "Приятно познакомиться!" },
      ],
    },
    {
      situation: "В магазине",
      emoji: "🛒",
      conversation: [
        { speaker: "Seller", text: "Can I help you?", russian: "Могу я вам помочь?" },
        {
          speaker: "You",
          options: [
            { text: "Yes, please", russian: "Да, пожалуйста", correct: true },
            { text: "No, thank you", russian: "Нет, спасибо", correct: true },
            { text: "I am hungry", russian: "Я голоден", correct: false },
          ],
        },
      ],
    },
  ]

  const [currentDialogue, setCurrentDialogue] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleOptionClick = (correct: boolean) => {
    setShowResult(true)
    if (correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentStep < dialogues[currentDialogue].conversation.length - 1) {
        setCurrentStep(currentStep + 1)
        setShowResult(false)
      } else {
        // Move to next dialogue
        const nextDialogue = (currentDialogue + 1) % dialogues.length
        setCurrentDialogue(nextDialogue)
        setCurrentStep(0)
        setShowResult(false)
      }
    }, 1500)
  }

  const currentConversation = dialogues[currentDialogue].conversation[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 pb-24">
      <SubjectHeader title="Dialogues" subtitle="Простые разговоры" color="secondary" />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/english">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to English
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

        {/* Situation */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">{dialogues[currentDialogue].emoji}</div>
          <h3 className="text-3xl font-bold">{dialogues[currentDialogue].situation}</h3>
        </div>

        {/* Conversation */}
        <div className="bg-card rounded-3xl p-8 shadow-lg mb-8">
          {"speaker" in currentConversation && currentConversation.speaker !== "You" && (
            <div className="mb-6">
              <div className="bg-secondary/20 rounded-2xl p-6">
                <div className="text-sm font-semibold text-secondary mb-2">{currentConversation.speaker}:</div>
                <p className="text-2xl font-bold mb-2">{currentConversation.text}</p>
                {"russian" in currentConversation && (
                  <p className="text-lg text-muted-foreground">{currentConversation.russian}</p>
                )}
              </div>
            </div>
          )}

          {"options" in currentConversation && (
            <div>
              <div className="text-sm font-semibold text-primary mb-4">Your turn - Выбери ответ:</div>
              <div className="space-y-3">
                {currentConversation.options.map((option, index) => (
                  <Button
                    key={index}
                    size="lg"
                    variant="outline"
                    className="w-full h-auto py-4 text-left justify-start hover:bg-secondary/10 hover:border-secondary bg-transparent"
                    onClick={() => handleOptionClick(option.correct)}
                    disabled={showResult}
                  >
                    <div>
                      <div className="text-xl font-bold mb-1">{option.text}</div>
                      <div className="text-sm text-muted-foreground">{option.russian}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Result */}
        {showResult && (
          <div className="text-center">
            <div className="text-4xl font-bold text-success">Great! 🎉</div>
          </div>
        )}

        {/* Progress */}
        <div className="flex justify-center gap-2">
          {dialogues[currentDialogue].conversation.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentStep ? "bg-secondary" : index < currentStep ? "bg-success" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
