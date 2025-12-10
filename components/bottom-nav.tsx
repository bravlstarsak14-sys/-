"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calculator, BookOpen, Globe, Languages, Home } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Главная", color: "text-foreground" },
    { href: "/math", icon: Calculator, label: "Математика", color: "text-primary" },
    { href: "/russian", icon: BookOpen, label: "Русский", color: "text-accent" },
    { href: "/world", icon: Globe, label: "Мир", color: "text-success" },
    { href: "/english", icon: Languages, label: "English", color: "text-secondary" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border shadow-lg z-50">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all min-w-[68px] ${
                  isActive ? "bg-muted scale-105" : "hover:bg-muted/50"
                }`}
              >
                <Icon
                  className={`w-7 h-7 ${isActive ? item.color : "text-muted-foreground"}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-xs font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
