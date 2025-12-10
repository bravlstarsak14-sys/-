"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Calculator, RotateCcw } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

interface Fruit {
  id: number
  emoji: string
  name: string
  x: number
  y: number
  inBasket: boolean
}

const fruitTypes = [
  { emoji: "🍎", name: "яблоки" },
  { emoji: "🍊", name: "апельсины" },
  { emoji: "🍌", name: "бананы" },
  { emoji: "🍇", name: "виноград" },
  { emoji: "🍓", name: "клубнику" },
]

export default function AdditionGame() {
  const [fruits, setFruits] = useState<Fruit[]>([])
  const [basketCount, setBasketCount] = useState(0)
  const [targetNumber, setTargetNumber] = useState(5)
  const [targetFruit, setTargetFruit] = useState(fruitTypes[0])
  const [stars, setStars] = useState(0)
  const [message, setMessage] = useState("")
  const [draggingId, setDraggingId] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const basketRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initGame()
  }, [])

  const initGame = () => {
    const newTarget = Math.floor(Math.random() * 4) + 3 // 3-6 fruits
    const randomFruit = fruitTypes[Math.floor(Math.random() * fruitTypes.length)]
    setTargetFruit(randomFruit)
    setTargetNumber(newTarget)
    setBasketCount(0)
    setMessage("")

    const newFruits: Fruit[] = []
    for (let i = 0; i < 15; i++) {
      const fruitType = fruitTypes[Math.floor(Math.random() * fruitTypes.length)]
      newFruits.push({
        id: i,
        emoji: fruitType.emoji,
        name: fruitType.name,
        x: Math.random() * 75 + 5,
        y: Math.random() * 60 + 5,
        inBasket: false,
      })
    }
    setFruits(newFruits)
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, id: number) => {
    e.preventDefault()
    const fruit = fruits.find((f) => f.id === id)
    if (!fruit || fruit.inBasket) return

    setDraggingId(id)
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    setDragOffset({ x: clientX, y: clientY })
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (draggingId === null) return
    e.preventDefault()

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    const fruit = fruits.find((f) => f.id === draggingId)
    if (!fruit) return

    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()

    const newX = ((clientX - rect.left) / rect.width) * 100
    const newY = ((clientY - rect.top) / rect.height) * 100

    setFruits((prev) =>
      prev.map((f) =>
        f.id === draggingId && !f.inBasket
          ? { ...f, x: Math.max(0, Math.min(90, newX)), y: Math.max(0, Math.min(85, newY)) }
          : f,
      ),
    )
  }

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (draggingId === null) return
    e.preventDefault()

    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX
    const clientY = "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY

    const draggedFruit = fruits.find((f) => f.id === draggingId)

    if (basketRef.current && draggedFruit) {
      const basketRect = basketRef.current.getBoundingClientRect()
      const padding = 20
      if (
        clientX >= basketRect.left - padding &&
        clientX <= basketRect.right + padding &&
        clientY >= basketRect.top - padding &&
        clientY <= basketRect.bottom + padding
      ) {
        if (draggedFruit.name === targetFruit.name) {
          const newFruits = fruits.map((f) => (f.id === draggingId ? { ...f, inBasket: true } : f))
          setFruits(newFruits)

          const newCount = basketCount + 1
          setBasketCount(newCount)

          if (newCount === targetNumber) {
            setMessage("🎉 Отлично! +10 звёзд")
            setStars((prev) => prev + 10)
            setTimeout(() => initGame(), 2000)
          }
        } else {
          setMessage("❌ Нужны " + targetFruit.name + "!")
          setTimeout(() => setMessage(""), 1500)
        }
      }
    }

    setDraggingId(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background pb-24">
      <SubjectHeader title="Собери яблоки" icon={Calculator} color="bg-primary" stars={stars} />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-card rounded-3xl p-6 shadow-lg mb-6 border-4 border-primary/20">
          <h2 className="text-3xl font-bold text-center text-foreground mb-2">
            Собери {targetNumber} {targetFruit.emoji}
          </h2>
          <p className="text-center text-muted-foreground text-xl font-semibold">
            Нужны: <span className="text-primary">{targetFruit.name}</span>
          </p>
          <p className="text-center text-muted-foreground mt-1">Перетаскивай правильные фрукты в корзину</p>
        </div>

        <div
          className="relative bg-gradient-to-b from-success/10 to-success/5 rounded-3xl p-6 min-h-[450px] mb-6 overflow-hidden"
          style={{ touchAction: "none" }}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {fruits.map(
            (fruit) =>
              !fruit.inBasket && (
                <div
                  key={fruit.id}
                  onMouseDown={(e) => handleDragStart(e, fruit.id)}
                  onTouchStart={(e) => handleDragStart(e, fruit.id)}
                  className={`absolute text-7xl transition-transform select-none ${
                    draggingId === fruit.id
                      ? "scale-125 z-50 cursor-grabbing drop-shadow-2xl"
                      : "cursor-grab hover:scale-110 active:scale-125"
                  }`}
                  style={{
                    left: `${fruit.x}%`,
                    top: `${fruit.y}%`,
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    touchAction: "none",
                  }}
                >
                  {fruit.emoji}
                </div>
              ),
          )}
        </div>

        <div className="bg-card rounded-3xl p-6 shadow-lg border-4 border-success/30" ref={basketRef}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-foreground">Корзина</h3>
            <button
              onClick={initGame}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-transform active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              Заново
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 min-h-[120px] bg-success/10 rounded-2xl p-6 border-2 border-dashed border-success/40">
            <div className="text-8xl animate-bounce-subtle">🧺</div>
            <div className="text-center">
              <div className="text-6xl font-bold text-success mb-2">{basketCount}</div>
              <div className="text-muted-foreground text-lg">из {targetNumber}</div>
            </div>
          </div>

          {message && (
            <div
              className={`mt-4 p-4 rounded-2xl text-center font-bold text-xl ${
                message.includes("Отлично")
                  ? "bg-success/20 text-success-foreground animate-bounce-in"
                  : "bg-destructive/20 text-destructive-foreground animate-shake"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
