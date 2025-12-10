import { Globe, Calendar, Play as Paw, Flower2, Cloud, MapPin } from "lucide-react"
import { SubjectHeader } from "@/components/subject-header"
import { GameCard } from "@/components/game-card"
import { BottomNav } from "@/components/bottom-nav"

export default function WorldPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-success/5 via-background to-background pb-24">
      <SubjectHeader title="Окружающий мир" icon={Globe} color="bg-success" stars={156} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Выбери игру</h2>
          <p className="text-muted-foreground leading-relaxed">Изучай природу и окружающий мир</p>
        </div>

        <div className="space-y-4">
          <GameCard
            title="Времена года"
            description="Свайпай чтобы менять сезоны"
            icon={Calendar}
            href="/world/seasons"
            difficulty="easy"
          />

          <GameCard
            title="Животные"
            description="Тапай на животное - слушай звуки и факты"
            icon={Paw}
            href="/world/animals"
            difficulty="easy"
          />

          <GameCard
            title="Вырасти цветок"
            description="Ухаживай за растением от семечка до цветка"
            icon={Flower2}
            href="/world/plants"
            difficulty="medium"
          />

          <GameCard
            title="Погода"
            description="Создавай дождь, солнце и снег"
            icon={Cloud}
            href="/world/weather"
            difficulty="easy"
          />

          <GameCard
            title="Карта России"
            description="Узнай о регионах и достопримечательностях"
            icon={MapPin}
            href="/world/russia"
            difficulty="medium"
          />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
