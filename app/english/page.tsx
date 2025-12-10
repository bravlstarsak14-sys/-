import { Languages, Home, Palette, MessageCircle, Play as Paw } from "lucide-react"
import { SubjectHeader } from "@/components/subject-header"
import { GameCard } from "@/components/game-card"
import { BottomNav } from "@/components/bottom-nav"

export default function EnglishPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/5 via-background to-background pb-24">
      <SubjectHeader title="English" icon={Languages} color="bg-secondary" stars={72} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Choose a game</h2>
          <p className="text-muted-foreground leading-relaxed">Learn English with fun</p>
        </div>

        <div className="space-y-4">
          <GameCard
            title="Room Words"
            description="Tap objects in the room to hear pronunciation"
            icon={Home}
            href="/english/room"
            difficulty="easy"
          />

          <GameCard
            title="Colors"
            description="Color pictures and learn color names"
            icon={Palette}
            href="/english/colors"
            difficulty="easy"
          />

          <GameCard
            title="Zoo Animals"
            description="Learn animal names with sounds"
            icon={Paw}
            href="/english/zoo"
            difficulty="easy"
          />

          <GameCard
            title="Simple Dialogues"
            description="Practice basic conversations"
            icon={MessageCircle}
            href="/english/dialogues"
            difficulty="medium"
          />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
