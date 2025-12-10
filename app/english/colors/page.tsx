"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { Palette, Volume2, RotateCcw } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { speak } from "@/lib/speech"

const colors = [
  { name: "Red", russian: "Красный", hex: "#ef4444" },
  { name: "Blue", russian: "Синий", hex: "#3b82f6" },
  { name: "Green", russian: "Зелёный", hex: "#22c55e" },
  { name: "Yellow", russian: "Жёлтый", hex: "#eab308" },
  { name: "Orange", russian: "Оранжевый", hex: "#f97316" },
  { name: "Purple", russian: "Фиолетовый", hex: "#a855f7" },
  { name: "Pink", russian: "Розовый", hex: "#ec4899" },
  { name: "Brown", russian: "Коричневый", hex: "#92400e" },
]

const pictures = [
  { name: "Apple", emoji: "🍎", defaultColor: "#ef4444" },
  { name: "Sun", emoji: "☀️", defaultColor: "#eab308" },
  { name: "Tree", emoji: "🌳", defaultColor: "#22c55e" },
  { name: "Heart", emoji: "❤️", defaultColor: "#ef4444" },
]

export default function ColorsGame() {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedPicture, setSelectedPicture] = useState(0)
  const [currentColor, setCurrentColor] = useState(pictures[0].defaultColor)
  const [playingSound, setPlayingSound] = useState(false)

  const handleColorClick = (color: (typeof colors)[0]) => {
    setSelectedColor(color)
    setCurrentColor(color.hex)
    setPlayingSound(true)

    // Speak color name in English
    speak(color.name, "en-US", 0.9)

    setTimeout(() => setPlayingSound(false), 1500)
  }

  const replaySound = () => {
    setPlayingSound(true)
    speak(selectedColor.name, "en-US", 0.9)
    setTimeout(() => setPlayingSound(false), 1500)
  }

  const resetPicture = () => {
    setCurrentColor(pictures[selectedPicture].defaultColor)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/5 via-background to-background pb-24">
      <SubjectHeader title="Colors" icon={Palette} color="bg-secondary" />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="bg-card rounded-3xl p-8 shadow-lg mb-6 text-center">
          <div
            className="text-9xl mb-4 transition-all duration-300"
            style={{ filter: `drop-shadow(0 0 20px ${currentColor})` }}
          >
            {pictures[selectedPicture].emoji}
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className={`text-3xl font-bold transition-all ${playingSound ? "animate-wiggle" : ""}`}>
              {selectedColor.name}
            </h2>
            <button
              onClick={replaySound}
              className={`px-4 py-2 bg-secondary text-secondary-foreground rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-transform ${
                playingSound ? "animate-pulse" : ""
              }`}
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <p className="text-muted-foreground text-lg mb-4">{selectedColor.russian}</p>

          <button
            onClick={resetPicture}
            className="px-4 py-2 bg-muted text-foreground rounded-xl font-semibold flex items-center gap-2 mx-auto hover:scale-105 transition-transform"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        <div className="bg-card rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4 text-center">Choose a color</h3>
          <div className="grid grid-cols-4 gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorClick(color)}
                className={`aspect-square rounded-2xl transition-all hover:scale-110 active:scale-95 ${
                  selectedColor.name === color.name ? "ring-4 ring-foreground scale-110" : ""
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {pictures.map((picture, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedPicture(index)
                setCurrentColor(picture.defaultColor)
              }}
              className={`aspect-square rounded-2xl text-4xl flex items-center justify-center transition-all ${
                selectedPicture === index
                  ? "bg-secondary text-secondary-foreground scale-105 shadow-lg"
                  : "bg-muted hover:bg-muted/70"
              }`}
            >
              {picture.emoji}
            </button>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
