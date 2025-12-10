"use client"

import { useEffect } from "react"

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("[v0] Service Worker registered successfully:", registration.scope)

            // Check for updates every hour
            setInterval(
              () => {
                registration.update()
              },
              60 * 60 * 1000,
            )
          })
          .catch((error) => {
            console.log("[v0] Service Worker registration failed:", error)
          })
      })

      // Handle service worker updates
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("[v0] Service Worker updated, reloading page")
        window.location.reload()
      })
    }
  }, [])

  return null
}
