import { BookOpen, Type, PuzzleIcon, List, Book, Mic } from "lucide-react"
import { SubjectHeader } from "@/components/subject-header"
import { GameCard } from "@/components/game-card"
import { BottomNav } from "@/components/bottom-nav"

export default function RussianPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/5 via-background to-background pb-24">
      <SubjectHeader title="Русский язык" icon={BookOpen} color="bg-accent" stars={89} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Выбери игру</h2>
          <p className="text-muted-foreground leading-relaxed">Изучай буквы, слова и предложения</p>
        </div>

        <div className="space-y-4">
          <GameCard
            title="Живая азбука"
            description="Тапай на букву и смотри анимацию"
            icon={Type}
            href="/russian/alphabet"
            difficulty="easy"
          />

          <GameCard
            title="Собери слово"
            description="Составляй слова из слогов-пазлов"
            icon={PuzzleIcon}
            href="/russian/words"
            difficulty="easy"
          />

          <GameCard
            title="Составь предложение"
            description="Расставляй слова в правильном порядке"
            icon={List}
            href="/russian/sentences"
            difficulty="medium"
          />

          <GameCard
            title="Диктант"
            description="Слушай и говори слова правильно"
            icon={Mic}
            href="/russian/dictation"
            difficulty="medium"
          />

          <GameCard
            title="Интерактивная книга"
            description="Читай сказку с анимациями"
            icon={Book}
            href="/russian/reading"
            difficulty="easy"
          />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
