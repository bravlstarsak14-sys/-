"use client"

import { Button } from "@/components/ui/button"
import { Star, Trophy, Home, RotateCcw } from "lucide-react"

interface GameCompleteModalProps {
  score: number
  maxScore?: number
  onReplay?: () => void
  onHome?: () => void
}

export function GameCompleteModal({ score, maxScore = 10, onReplay, onHome }: GameCompleteModalProps) {
  const percentage = (score / maxScore) * 100
  const stars = percentage >= 90 ? 3 : percentage >= 70 ? 2 : percentage >= 50 ? 1 : 0

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-bounce-in">
      <div className="bg-card rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-warning">
        {/* Trophy Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-warning text-warning-foreground rounded-full flex items-center justify-center animate-star-pop">
            <Trophy className="w-16 h-16" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-4">Молодец!</h2>

        {/* Score */}
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-primary mb-2">{score}</div>
          <p className="text-xl text-muted-foreground">из {maxScore} правильных ответов</p>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Star
              key={i}
              className={`w-12 h-12 ${i < stars ? "text-warning fill-warning animate-star-pop" : "text-muted"}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          {onReplay && (
            <Button size="lg" className="w-full font-bold" onClick={onReplay}>
              <RotateCcw className="w-5 h-5 mr-2" />
              Играть ещё раз
            </Button>
          )}

          {onHome && (
            <Button size="lg" variant="outline" className="w-full font-bold bg-transparent" onClick={onHome}>
              <Home className="w-5 h-5 mr-2" />
              На главную
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
