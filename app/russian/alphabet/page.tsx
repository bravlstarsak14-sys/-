"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { BookOpen, Volume2 } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { speak } from "@/lib/speech"

const alphabet = [
  { letter: "А", word: "Аист", emoji: "🦅", color: "bg-red-500", sound: "Кур-лы кур-лы" },
  { letter: "Б", word: "Бабочка", emoji: "🦋", color: "bg-blue-500", sound: "Фррр фррр" },
  { letter: "В", word: "Волк", emoji: "🐺", color: "bg-gray-600", sound: "У-у-у" },
  { letter: "Г", word: "Гусь", emoji: "🦆", color: "bg-yellow-500", sound: "Га-га-га" },
  { letter: "Д", word: "Дом", emoji: "🏠", color: "bg-orange-500", sound: "Тук-тук" },
  { letter: "Е", word: "Енот", emoji: "🦝", color: "bg-green-600", sound: "Хрр-хрр" },
  { letter: "Ё", word: "Ёжик", emoji: "🦔", color: "bg-amber-700", sound: "Фу-фу-фу" },
  { letter: "Ж", word: "Жук", emoji: "🪲", color: "bg-emerald-600", sound: "Ж-ж-ж" },
  { letter: "З", word: "Заяц", emoji: "🐰", color: "bg-gray-400", sound: "Прыг-прыг" },
  { letter: "И", word: "Игрушка", emoji: "🧸", color: "bg-pink-500", sound: "Пи-пи" },
  { letter: "Й", word: "Йогурт", emoji: "🥛", color: "bg-blue-300", sound: "Хлюп-хлюп" },
  { letter: "К", word: "Кот", emoji: "🐱", color: "bg-orange-400", sound: "Мяу-мяу" },
  { letter: "Л", word: "Лиса", emoji: "🦊", color: "bg-orange-600", sound: "Тяф-тяф" },
  { letter: "М", word: "Медведь", emoji: "🐻", color: "bg-amber-900", sound: "Ры-ы-ы" },
  { letter: "Н", word: "Нос", emoji: "👃", color: "bg-red-400", sound: "Апчхи" },
  { letter: "О", word: "Облако", emoji: "☁️", color: "bg-sky-300", sound: "Ш-ш-ш" },
  { letter: "П", word: "Пчела", emoji: "🐝", color: "bg-yellow-400", sound: "Ж-ж-ж" },
  { letter: "Р", word: "Рыба", emoji: "🐟", color: "bg-blue-400", sound: "Буль-буль" },
  { letter: "С", word: "Слон", emoji: "🐘", color: "bg-gray-500", sound: "Труууу" },
  { letter: "Т", word: "Тигр", emoji: "🐯", color: "bg-orange-700", sound: "Р-р-р" },
  { letter: "У", word: "Утка", emoji: "🦆", color: "bg-teal-500", sound: "Кря-кря" },
  { letter: "Ф", word: "Фламинго", emoji: "🦩", color: "bg-pink-400", sound: "Фрр-фрр" },
  { letter: "Х", word: "Хомяк", emoji: "🐹", color: "bg-amber-600", sound: "Хрум-хрум" },
  { letter: "Ц", word: "Цветок", emoji: "🌸", color: "bg-pink-300", sound: "Пш-ш-ш" },
  { letter: "Ч", word: "Черепаха", emoji: "🐢", color: "bg-green-700", sound: "Ш-ш-ш" },
  { letter: "Ш", word: "Шар", emoji: "🎈", color: "bg-red-500", sound: "Пш-ш-ш" },
  { letter: "Щ", word: "Щенок", emoji: "🐶", color: "bg-yellow-700", sound: "Гав-гав" },
  { letter: "Ы", word: "Сыр", emoji: "🧀", color: "bg-yellow-300", sound: "Хрум-хрум" },
  { letter: "Э", word: "Экскаватор", emoji: "🚜", color: "bg-yellow-600", sound: "Др-р-р" },
  { letter: "Ю", word: "Юла", emoji: "🌀", color: "bg-purple-500", sound: "Вжжж" },
  { letter: "Я", word: "Яблоко", emoji: "🍎", color: "bg-red-600", sound: "Хрум-хрум" },
]

export default function AlphabetGame() {
  const [selected, setSelected] = useState<(typeof alphabet)[0] | null>(null)
  const [playingSound, setPlayingSound] = useState(false)

  const handleLetterClick = (item: (typeof alphabet)[0]) => {
    setSelected(item)
    setPlayingSound(true)

    // Pronounce letter and word in Russian
    speak(`${item.letter}. ${item.word}`, "ru-RU", 0.9)

    setTimeout(() => setPlayingSound(false), 2000)
  }

  const handlePlaySound = () => {
    if (!selected) return
    setPlayingSound(true)
    speak(`${selected.letter}. ${selected.word}`, "ru-RU", 0.9)
    setTimeout(() => setPlayingSound(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/5 via-background to-background pb-24">
      <SubjectHeader title="Живая азбука" icon={BookOpen} color="bg-accent" />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {selected && (
          <div className="bg-card rounded-3xl p-8 shadow-lg mb-6 animate-bounce-in">
            <div className="text-center">
              <div className={`text-9xl mb-4 ${playingSound ? "animate-wiggle" : ""}`}>{selected.emoji}</div>
              <div className="text-7xl font-bold text-accent mb-4">{selected.letter}</div>
              <div className="text-3xl font-bold text-foreground mb-4">{selected.word}</div>
              <button
                onClick={handlePlaySound}
                className={`flex items-center gap-2 mx-auto px-6 py-3 bg-accent text-accent-foreground rounded-2xl font-semibold text-lg hover:scale-105 transition-transform ${playingSound ? "animate-pulse" : ""}`}
              >
                <Volume2 className="w-6 h-6" />
                Слушать
              </button>
            </div>
          </div>
        )}

        <div className="bg-card rounded-3xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Тапай на букву</h2>

          <div className="grid grid-cols-6 md:grid-cols-8 gap-2">
            {alphabet.map((item) => (
              <button
                key={item.letter}
                onClick={() => handleLetterClick(item)}
                className={`aspect-square ${item.color} text-white rounded-2xl font-bold text-2xl hover:scale-110 active:scale-95 transition-transform shadow-md`}
              >
                {item.letter}
              </button>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
