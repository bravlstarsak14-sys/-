"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface SubjectHeaderProps {
  title: string
  subtitle?: string // Added optional subtitle prop
  icon?: LucideIcon // Made icon optional
  color: string
  stars?: number
}

export function SubjectHeader({ title, subtitle, icon: Icon, color, stars = 0 }: SubjectHeaderProps) {
  const router = useRouter()

  return (
    <header className={`sticky top-0 z-40 ${color} text-white shadow-lg`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-11 h-11 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
              aria-label="Назад"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              {Icon && <Icon className="w-9 h-9" />}
              <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
              </div>
            </div>
          </div>

          {stars > 0 && (
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
              <Star className="w-6 h-6 fill-warning text-warning" />
              <span className="text-xl font-bold">{stars}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
