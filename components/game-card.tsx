import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface GameCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  difficulty: string
  locked?: boolean
}

export function GameCard({ title, description, icon: Icon, href, difficulty, locked = false }: GameCardProps) {
  const difficultyColors = {
    easy: "bg-success/20 text-success-foreground",
    medium: "bg-warning/20 text-warning-foreground",
    hard: "bg-destructive/20 text-destructive-foreground",
  }

  const content = (
    <div
      className={`bg-card rounded-3xl p-6 shadow-lg transition-all ${
        locked ? "opacity-60 cursor-not-allowed" : "hover:shadow-xl hover:scale-105 cursor-pointer"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
            locked ? "bg-muted" : "bg-primary text-primary-foreground"
          }`}
        >
          <Icon className="w-9 h-9" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
          <div className="mt-3 flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                difficultyColors[difficulty as keyof typeof difficultyColors] || difficultyColors.easy
              }`}
            >
              {difficulty === "easy" ? "Легко" : difficulty === "medium" ? "Средне" : "Сложно"}
            </span>
            {locked && <span className="px-3 py-1 bg-muted rounded-full text-sm font-semibold">🔒 Заблокировано</span>}
          </div>
        </div>
      </div>
    </div>
  )

  if (locked) {
    return <div>{content}</div>
  }

  return <Link href={href}>{content}</Link>
}
