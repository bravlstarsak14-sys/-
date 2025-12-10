"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Play as Paw, Volume2 } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { speak } from "@/lib/speech"

const animals = [
  { name: "Кот", emoji: "🐱", sound: "Мяу-мяу", fact: "Кошки спят 12-16 часов в день!", habitat: "Дом" },
  { name: "Собака", emoji: "🐶", sound: "Гав-гав", fact: "Собаки могут различать до 250 слов!", habitat: "Дом" },
  { name: "Корова", emoji: "🐮", sound: "Му-у-у", fact: "Коровы дают молоко для йогурта и сыра.", habitat: "Ферма" },
  { name: "Лошадь", emoji: "🐴", sound: "И-го-го", fact: "Лошади могут спать стоя!", habitat: "Ферма" },
  { name: "Слон", emoji: "🐘", sound: "Труууу", fact: "Слоны - самые большие сухопутные животные.", habitat: "Африка" },
  {
    name: "Лев",
    emoji: "🦁",
    sound: "Р-р-р",
    fact: "Львы живут в стаях, которые называются прайдами.",
    habitat: "Африка",
  },
  { name: "Медведь", emoji: "🐻", sound: "Ры-ы-ы", fact: "Медведи спят всю зиму в берлоге.", habitat: "Лес" },
  { name: "Волк", emoji: "🐺", sound: "У-у-у", fact: "Волки воют, чтобы общаться с другими волками.", habitat: "Лес" },
  { name: "Лиса", emoji: "🦊", sound: "Тяф-тяф", fact: "Лисы очень хитрые и умные животные.", habitat: "Лес" },
  {
    name: "Пингвин",
    emoji: "🐧",
    sound: "Кря-кря",
    fact: "Пингвины не умеют летать, но отлично плавают!",
    habitat: "Антарктида",
  },
]

export default function AnimalsGame() {
  const [selected, setSelected] = useState(animals[0])
  const [playingSound, setPlayingSound] = useState(false)

  const handleAnimalClick = (animal: (typeof animals)[0]) => {
    setSelected(animal)
    setPlayingSound(true)

    // Speak the animal name and sound
    speak(`${animal.name}. ${animal.sound}`, "ru-RU", 0.9)

    setTimeout(() => setPlayingSound(false), 2000)
  }

  const playSound = () => {
    setPlayingSound(true)
    speak(`${selected.name}. ${selected.sound}`, "ru-RU", 0.9)
    setTimeout(() => setPlayingSound(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-success/5 via-background to-background pb-24">
      <SubjectHeader title="Животные" icon={Paw} color="bg-success" />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-card rounded-3xl p-8 shadow-lg mb-6 animate-bounce-in">
          <div className="text-center">
            <div className={`text-9xl mb-4 ${playingSound ? "animate-wiggle" : ""}`}>{selected.emoji}</div>
            <h2 className="text-4xl font-bold text-foreground mb-2">{selected.name}</h2>
            <button
              onClick={playSound}
              className={`flex items-center gap-3 mx-auto px-6 py-3 bg-success text-success-foreground rounded-2xl font-bold text-xl mb-4 hover:scale-105 transition-transform ${
                playingSound ? "animate-pulse" : ""
              }`}
            >
              <Volume2 className="w-6 h-6" />
              {selected.sound}
            </button>
            <div className="bg-muted/50 rounded-2xl p-4 mb-3">
              <p className="text-lg text-foreground leading-relaxed">{selected.fact}</p>
            </div>
            <div className="inline-block px-4 py-2 bg-success/20 rounded-xl font-semibold text-success-foreground">
              Место обитания: {selected.habitat}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-3xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Выбери животное</h3>
          <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
            {animals.map((animal) => (
              <button
                key={animal.name}
                onClick={() => handleAnimalClick(animal)}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all ${
                  selected.name === animal.name
                    ? "bg-success text-success-foreground scale-105 shadow-lg"
                    : "bg-muted hover:bg-muted/70"
                }`}
              >
                <div className="text-4xl mb-1">{animal.emoji}</div>
                <div className="text-xs font-semibold">{animal.name}</div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
