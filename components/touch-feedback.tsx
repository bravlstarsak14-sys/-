"use client"

import { useEffect, useState } from "react"

interface TouchPoint {
  id: number
  x: number
  y: number
}

export function TouchFeedback() {
  const [touches, setTouches] = useState<TouchPoint[]>([])

  useEffect(() => {
    let nextId = 0

    const handleTouch = (e: TouchEvent) => {
      const newTouches: TouchPoint[] = []

      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i]
        newTouches.push({
          id: nextId++,
          x: touch.clientX,
          y: touch.clientY,
        })
      }

      setTouches(newTouches)

      // Clear touches after animation
      setTimeout(() => {
        setTouches([])
      }, 600)
    }

    document.addEventListener("touchstart", handleTouch)

    return () => {
      document.removeEventListener("touchstart", handleTouch)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {touches.map((touch) => (
        <div
          key={touch.id}
          className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 animate-ping"
          style={{
            left: touch.x,
            top: touch.y,
          }}
        />
      ))}
    </div>
  )
}
