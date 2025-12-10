import type React from "react"
import type { Metadata, Viewport } from "next"
import { Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { ServiceWorkerRegister } from "@/components/service-worker-register"

// Using Nunito - child-friendly rounded font
const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Умный урок - Образовательное приложение",
  description: "Интерактивное обучение для начальной школы: математика, русский язык, окружающий мир и английский",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Умный урок",
  },
  icons: {
    icon: [
      { url: "/icon-192.jpg", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.jpg", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.jpg",
  },
}

export const viewport: Viewport = {
  themeColor: "#5b8dff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="apple-touch-icon" href="/apple-icon.jpg" />
      </head>
      <body className={`${nunito.className} antialiased`}>
        {children}
        <PWAInstallPrompt />
        <ServiceWorkerRegister />
        <Analytics />
      </body>
    </html>
  )
}
