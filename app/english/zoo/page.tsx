"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Star, Volume2 } from "lucide-react"
import Link from "next/link"

export default function ZooPage() {
  const animals = [
    { name: "Cat", russian: "Кот", emoji: "🐱", sound: "Meow!" },
    { name: "Dog", russian: "Собака", emoji: "🐶", sound: "Woof!" },
    { name: "Elephant", russian: "Слон", emoji: "🐘", sound: "Trumpet!" },
    { name: "Lion", russian: "Лев", emoji: "🦁", sound: "Roar!" },
    { name: "Monkey", russian: "Обезьяна", emoji: "🐵", sound: "Ooh ooh!" },
    { name: "Bear", russian: "Медведь", emoji: "🐻", sound: "Growl!" },
    { name: "Rabbit", russian: "Кролик", emoji: "🐰", sound: "Squeak!" },
    { name: "Fox", russian: "Лиса", emoji: "🦊", sound: "Yip!" },
  ]

  const [score, setScore] = useState(0)
  const [currentAnimal, setCurrentAnimal] = useState<(typeof animals)[0] | null>(null)

  const handleAnimalClick = (animal: (typeof animals)[0]) => {
    setCurrentAnimal(animal)
    setScore(score + 1)

    // Speak the animal name
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(animal.name)
      utterance.lang = "en-US"
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const speakAnimal = () => {
    if (currentAnimal && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentAnimal.name)
      utterance.lang = "en-US"
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 pb-24">
      <SubjectHeader title="Zoo Animals" subtitle="Зоопарк с озвучкой" color="secondary" />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
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

        {/* Selected Animal Display */}
        {currentAnimal && (
          <div className="bg-card rounded-3xl p-8 shadow-lg mb-8 border-4 border-secondary/30 animate-bounce-in">
            <div className="text-center">
              <div className="text-9xl mb-4">{currentAnimal.emoji}</div>
              <h3 className="text-4xl font-bold mb-2">{currentAnimal.name}</h3>
              <p className="text-2xl text-muted-foreground mb-4">({currentAnimal.russian})</p>
              <div className="text-3xl mb-6">{currentAnimal.sound}</div>
              <Button size="lg" onClick={speakAnimal} className="bg-secondary hover:bg-secondary/80">
                <Volume2 className="w-6 h-6 mr-2" />
                Произнести
              </Button>
            </div>
          </div>
        )}

        {/* Animals Grid */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center">Тапай на животных:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {animals.map((animal) => (
              <button
                key={animal.name}
                onClick={() => handleAnimalClick(animal)}
                className="bg-card hover:bg-secondary/10 rounded-2xl p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl border-4 border-transparent hover:border-secondary/30"
              >
                <div className="text-7xl mb-3">{animal.emoji}</div>
                <p className="text-xl font-bold">{animal.name}</p>
                <p className="text-sm text-muted-foreground">{animal.russian}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-warning/10 rounded-2xl border-2 border-warning/30">
          <p className="text-center text-muted-foreground">
            Нажми на животное чтобы услышать его название по-английски
          </p>
        </div>
      </main>
    </div>
  )
}
