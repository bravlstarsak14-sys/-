"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, Cone, Cylinder, Box as BoxMesh } from "@react-three/drei"
import { SubjectHeader } from "@/components/subject-header"
import { Box } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { useState } from "react"

const shapes = [
  { name: "Куб", component: BoxMesh, color: "#5b8dff", args: [1, 1, 1] },
  { name: "Шар", component: Sphere, color: "#ff6b9d", args: [1, 32, 32] },
  { name: "Конус", component: Cone, color: "#ffa500", args: [1, 2, 32] },
  { name: "Цилиндр", component: Cylinder, color: "#4ade80", args: [1, 1, 2, 32] },
]

function Shape3D({ ShapeComponent, color, args }: { ShapeComponent: any; color: string; args: any[] }) {
  return (
    <ShapeComponent args={args} scale={1.5}>
      <meshStandardMaterial color={color} />
    </ShapeComponent>
  )
}

export default function GeometryGame() {
  const [currentShape, setCurrentShape] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background pb-24">
      <SubjectHeader title="3D Фигуры" icon={Box} color="bg-primary" />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="bg-card rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="text-3xl font-bold text-center text-foreground mb-2">{shapes[currentShape].name}</h2>
          <p className="text-center text-muted-foreground text-lg">
            Верти фигуру пальцами чтобы изучить со всех сторон
          </p>
        </div>

        <div
          className="bg-gradient-to-b from-primary/10 to-primary/5 rounded-3xl overflow-hidden shadow-lg mb-6"
          style={{ height: "400px" }}
        >
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Suspense fallback={null}>
              <Shape3D
                ShapeComponent={shapes[currentShape].component}
                color={shapes[currentShape].color}
                args={shapes[currentShape].args}
              />
              <OrbitControls enableZoom={false} />
            </Suspense>
          </Canvas>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {shapes.map((shape, index) => (
            <button
              key={index}
              onClick={() => setCurrentShape(index)}
              className={`p-4 rounded-2xl font-bold transition-all ${
                currentShape === index
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              {shape.name}
            </button>
          ))}
        </div>

        <div className="mt-6 bg-muted/50 rounded-2xl p-6">
          <h3 className="font-bold text-foreground mb-2 text-lg">Интересно:</h3>
          <p className="text-muted-foreground leading-relaxed">
            {currentShape === 0 && "У куба 6 одинаковых граней, 12 рёбер и 8 вершин. Кубик Рубика - это куб!"}
            {currentShape === 1 && "Шар - это идеально круглая фигура. Мяч, глобус и планеты имеют форму шара!"}
            {currentShape === 2 &&
              "У конуса круглое основание и острая вершина. Мороженое в вафельном рожке - это конус!"}
            {currentShape === 3 && "Цилиндр имеет два круглых основания. Банка и карандаш имеют форму цилиндра!"}
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
