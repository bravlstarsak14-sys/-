"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      console.log("[v0] User accepted PWA install")
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 animate-bounce-in">
      <div className="bg-card border-4 border-primary rounded-3xl shadow-2xl p-6 max-w-md mx-auto">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center flex-shrink-0">
            <Download className="w-8 h-8" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Установить приложение</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Установи Умный урок на свой телефон для быстрого доступа и работы без интернета
            </p>

            <Button size="lg" className="w-full font-bold" onClick={handleInstall}>
              <Download className="w-5 h-5 mr-2" />
              Установить
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
