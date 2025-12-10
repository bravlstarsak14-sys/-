import { Calculator, Plus, X, Pizza, Box, Ruler } from "lucide-react"
import { SubjectHeader } from "@/components/subject-header"
import { GameCard } from "@/components/game-card"
import { BottomNav } from "@/components/bottom-nav"

export default function MathPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background pb-24">
      <SubjectHeader title="Математика" icon={Calculator} color="bg-primary" stars={127} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Выбери игру</h2>
          <p className="text-muted-foreground leading-relaxed">Учись считать играючи</p>
        </div>

        <div className="space-y-4">
          <GameCard
            title="Собери яблоки"
            description="Перетаскивай фрукты в корзину и считай сумму"
            icon={Plus}
            href="/math/addition"
            difficulty="easy"
          />

          <GameCard
            title="Таблица умножения"
            description="Тапай на правильные ответы и получай звёзды"
            icon={X}
            href="/math/multiplication"
            difficulty="medium"
          />

          <GameCard
            title="Разрежь пиццу"
            description="Учись делить на части и понимать дроби"
            icon={Pizza}
            href="/math/fractions"
            difficulty="medium"
          />

          <GameCard
            title="3D фигуры"
            description="Верти фигуры пальцами и изучай геометрию"
            icon={Box}
            href="/math/geometry"
            difficulty="easy"
          />

          <GameCard
            title="Виртуальная линейка"
            description="Измеряй предметы на экране телефона"
            icon={Ruler}
            href="/math/ruler"
            difficulty="easy"
          />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
