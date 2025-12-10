"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Home, Volume2 } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { speak } from "@/lib/speech"

const roomItems = [
  { name: "Table", russian: "Стол", emoji: "🪑", x: 30, y: 60 },
  { name: "Chair", russian: "Стул", emoji: "🪑", x: 25, y: 70 },
  { name: "Window", russian: "Окно", emoji: "🪟", x: 70, y: 20 },
  { name: "Door", russian: "Дверь", emoji: "🚪", x: 10, y: 40 },
  { name: "Lamp", russian: "Лампа", emoji: "💡", x: 50, y: 10 },
  { name: "Book", russian: "Книга", emoji: "📚", x: 35, y: 55 },
  { name: "Clock", russian: "Часы", emoji: "🕐", x: 75, y: 30 },
  { name: "Plant", russian: "Растение", emoji: "🪴", x: 80, y: 65 },
  { name: "Bed", russian: "Кровать", emoji: "🛏️", x: 60, y: 70 },
  { name: "Carpet", russian: "Ковёр", emoji: "🟫", x: 45, y: 80 },
]

export default function RoomGame() {
  const [selected, setSelected] = useState<(typeof roomItems)[0] | null>(null)
  const [playingSound, setPlayingSound] = useState(false)

  const handleItemClick = (item: (typeof roomItems)[0]) => {
    setSelected(item)
    setPlayingSound(true)

    // Speak in English
    speak(item.name, "en-US", 0.9)

    setTimeout(() => setPlayingSound(false), 1500)
  }

  const replaySound = () => {
    if (!selected) return
    setPlayingSound(true)
    speak(selected.name, "en-US", 0.9)
    setTimeout(() => setPlayingSound(false), 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/5 via-background to-background pb-24">
      <SubjectHeader title="Room Words" icon={Home} color="bg-secondary" />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {selected && (
          <div className="bg-card rounded-3xl p-6 shadow-lg mb-6 animate-bounce-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`text-6xl ${playingSound ? "animate-wiggle" : ""}`}>{selected.emoji}</div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">{selected.name}</h2>
                  <p className="text-muted-foreground text-lg">{selected.russian}</p>
                </div>
              </div>
              <button
                onClick={replaySound}
                className={`px-6 py-3 bg-secondary text-secondary-foreground rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform ${
                  playingSound ? "animate-pulse" : ""
                }`}
              >
                <Volume2 className="w-6 h-6" />
                Listen
              </button>
            </div>
          </div>
        )}

        <div className="relative bg-gradient-to-b from-secondary/10 to-secondary/5 rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
          <div className="absolute inset-0 bg-[url('/cozy-bedroom-illustration.jpg')] bg-cover bg-center opacity-20" />

          {roomItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className="absolute text-5xl hover:scale-125 active:scale-95 transition-transform cursor-pointer z-10"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              aria-label={item.name}
            >
              {item.emoji}
            </button>
          ))}
        </div>

        <div className="mt-6 bg-muted/50 rounded-2xl p-4 text-center">
          <p className="text-muted-foreground text-lg">Tap on objects in the room to learn their names</p>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
