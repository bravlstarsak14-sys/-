"use client"

import { useState } from "react"
import { SubjectHeader } from "@/components/subject-header"
import { GraduationCap, Users, Play, BarChart3, FileText } from "lucide-react"
import Link from "next/link"

const mockStudents = [
  { id: 1, name: "Анна Иванова", stars: 245, lastActive: "5 мин назад", progress: 78 },
  { id: 2, name: "Петр Сидоров", stars: 198, lastActive: "10 мин назад", progress: 65 },
  { id: 3, name: "Мария Петрова", stars: 312, lastActive: "2 мин назад", progress: 92 },
  { id: 4, name: "Иван Козлов", stars: 167, lastActive: "1 час назад", progress: 54 },
  { id: 5, name: "Ольга Смирнова", stars: 289, lastActive: "3 мин назад", progress: 85 },
]

const subjects = [
  { name: "Математика", activeStudents: 18, icon: "🔢", color: "bg-primary" },
  { name: "Русский язык", activeStudents: 15, icon: "📚", color: "bg-accent" },
  { name: "Окружающий мир", activeStudents: 12, icon: "🌍", color: "bg-success" },
  { name: "English", activeStudents: 10, icon: "🗣️", color: "bg-secondary" },
]

export default function TeacherDashboard() {
  const [classCode] = useState("4A-2024")

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 via-background to-background">
      <SubjectHeader title="Панель учителя" icon={GraduationCap} color="bg-foreground" />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Class Info */}
        <div className="bg-card rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Класс 4А</h2>
              <p className="text-muted-foreground">Всего учеников: 25 человек</p>
            </div>
            <div className="bg-primary/10 px-6 py-3 rounded-2xl">
              <p className="text-sm text-muted-foreground mb-1">Код класса</p>
              <p className="text-3xl font-bold text-primary">{classCode}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-primary" />
              <span className="text-3xl font-bold text-foreground">25</span>
            </div>
            <p className="text-muted-foreground font-semibold">Учеников</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Play className="w-8 h-8 text-success" />
              <span className="text-3xl font-bold text-foreground">18</span>
            </div>
            <p className="text-muted-foreground font-semibold">Сейчас учатся</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-warning" />
              <span className="text-3xl font-bold text-foreground">74%</span>
            </div>
            <p className="text-muted-foreground font-semibold">Средний прогресс</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-accent" />
              <span className="text-3xl font-bold text-foreground">12</span>
            </div>
            <p className="text-muted-foreground font-semibold">Активных заданий</p>
          </div>
        </div>

        {/* Subjects */}
        <div className="bg-card rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Активность по предметам</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-muted/50 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-12 h-12 ${subject.color} text-white rounded-xl flex items-center justify-center text-2xl`}
                  >
                    {subject.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground">{subject.name}</h4>
                    <p className="text-sm text-muted-foreground">{subject.activeStudents} учеников</p>
                  </div>
                </div>
                <Link
                  href={`/teacher/assign?subject=${subject.name}`}
                  className="block w-full text-center px-4 py-2 bg-foreground text-background rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Задать урок
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Student List */}
        <div className="bg-card rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-foreground mb-4">Топ учеников</h3>
          <div className="space-y-3">
            {mockStudents.map((student, index) => (
              <div
                key={student.id}
                className="flex items-center gap-4 p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{student.name}</h4>
                  <p className="text-sm text-muted-foreground">{student.lastActive}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Прогресс</p>
                    <p className="font-bold text-foreground">{student.progress}%</p>
                  </div>
                  <div className="flex items-center gap-1 bg-warning/20 px-3 py-2 rounded-xl">
                    <span className="text-2xl">⭐</span>
                    <span className="font-bold text-foreground">{student.stars}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/teacher/students"
            className="block w-full text-center mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-opacity"
          >
            Смотреть всех учеников
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Link
            href="/teacher/create-lesson"
            className="bg-card hover:bg-muted/50 rounded-2xl p-6 shadow-lg transition-colors"
          >
            <div className="text-4xl mb-3">📝</div>
            <h4 className="font-bold text-foreground mb-1">Создать урок</h4>
            <p className="text-sm text-muted-foreground">Настройте задания для класса</p>
          </Link>

          <Link
            href="/teacher/reports"
            className="bg-card hover:bg-muted/50 rounded-2xl p-6 shadow-lg transition-colors"
          >
            <div className="text-4xl mb-3">📊</div>
            <h4 className="font-bold text-foreground mb-1">Отчёты</h4>
            <p className="text-sm text-muted-foreground">Экспорт результатов в Excel</p>
          </Link>

          <Link
            href="/teacher/settings"
            className="bg-card hover:bg-muted/50 rounded-2xl p-6 shadow-lg transition-colors"
          >
            <div className="text-4xl mb-3">⚙️</div>
            <h4 className="font-bold text-foreground mb-1">Настройки</h4>
            <p className="text-sm text-muted-foreground">Управление классом</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
