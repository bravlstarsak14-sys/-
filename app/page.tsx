import Link from "next/link"
import { BookOpen, Globe, Languages, GraduationCap } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-10 h-10" />
            <h1 className="text-2xl font-bold">Умный урок</h1>
          </div>
          <Link href="/teacher" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-semibold text-sm">
            Для учителя
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-bounce-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">{"Привет! 👋"}</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">{"Выбери предмет и начни учиться играя"}</p>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Math Card */}
          <Link href="/math">
            <div className="group bg-card hover:bg-primary/5 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border-4 border-transparent hover:border-primary">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/40 to-white/10 border-4 border-white/60 shadow-inner" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Математика</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{"Считай, умножай и играй с числами"}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-muted rounded-full text-sm font-semibold">1-4 класс</span>
                <span className="px-3 py-1 bg-success/20 text-success-foreground rounded-full text-sm font-semibold">
                  5 игр
                </span>
              </div>
            </div>
          </Link>

          {/* Russian Language Card */}
          <Link href="/russian">
            <div className="group bg-card hover:bg-accent/5 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border-4 border-transparent hover:border-accent">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Русский язык</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{"Буквы, слова и весёлые предложения"}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-muted rounded-full text-sm font-semibold">1-4 класс</span>
                <span className="px-3 py-1 bg-success/20 text-success-foreground rounded-full text-sm font-semibold">
                  5 игр
                </span>
              </div>
            </div>
          </Link>

          {/* World Around Us Card */}
          <Link href="/world">
            <div className="group bg-card hover:bg-success/5 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border-4 border-transparent hover:border-success">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-success text-success-foreground rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Окружающий мир</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{"Природа, животные и времена года"}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-muted rounded-full text-sm font-semibold">1-4 класс</span>
                <span className="px-3 py-1 bg-success/20 text-success-foreground rounded-full text-sm font-semibold">
                  5 игр
                </span>
              </div>
            </div>
          </Link>

          {/* English Card */}
          <Link href="/english">
            <div className="group bg-card hover:bg-secondary/5 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border-4 border-transparent hover:border-secondary">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-secondary text-secondary-foreground rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Languages className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Английский язык</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{"Слова, цвета и простые диалоги"}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-muted rounded-full text-sm font-semibold">1-4 класс</span>
                <span className="px-3 py-1 bg-success/20 text-success-foreground rounded-full text-sm font-semibold">
                  4 игры
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 p-6 bg-gradient-to-r from-warning/10 to-secondary/10 rounded-3xl border-2 border-warning/20">
          <div className="flex items-center gap-4">
            <div className="text-5xl">⭐</div>
            <div>
              <h4 className="text-xl font-bold text-foreground mb-1">{"Твой прогресс"}</h4>
              <p className="text-muted-foreground">{"Войди с кодом класса чтобы сохранять результаты"}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
