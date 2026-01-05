"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Frown, ArrowLeft } from "lucide-react"

interface FinalScreenProps {
  selectedPlan: "classico" | "tematica" | "inimigos" | null
  onBack: () => void
}

export function FinalScreen({ selectedPlan, onBack }: FinalScreenProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [noButtonSize, setNoButtonSize] = useState(1)
  const [attempts, setAttempts] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const planNames = {
    classico: "um Clássico Minimalista",
    tematica: "uma Experiência Temática",
    inimigos: 'um Plano "Inimigos do Fim"',
  }

  const handleNoHover = () => {
    if (!containerRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const maxX = container.width - 150
    const maxY = container.height - 60

    const newX = Math.random() * maxX - maxX / 2
    const newY = Math.random() * maxY - maxY / 2

    setNoButtonPosition({ x: newX, y: newY })
    setNoButtonSize(Math.max(0.5, noButtonSize - 0.1))
    setAttempts((prev) => prev + 1)
  }

  const handleYesClick = () => {
    const planName = selectedPlan ? planNames[selectedPlan] : "a experiência gastronômica"
    const message = encodeURIComponent(`Oi! Eu aceito o convite para ${planName}! (:`)
    const phoneNumber = "5599991443864" 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const yesButtonSize = Math.min(2, 1 + attempts * 0.15)

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/20 via-background to-secondary p-3 md:p-4"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-accent fill-accent opacity-10"
            size={40}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <Button onClick={onBack} variant="ghost" size="sm" className="absolute top-4 left-4 z-30 text-xs md:text-sm">
        <ArrowLeft className="mr-1 w-3 h-3 md:w-4 md:h-4" />
        Voltar
      </Button>

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6 md:space-y-12 animate-in fade-in-up duration-700">
        {/* Question */}
        <div className="space-y-2 md:space-y-4 px-2">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
            {selectedPlan ? `Aceita o convite para ${planNames[selectedPlan]}?` : "Então, aceita o convite?"}
          </h2>
          <p className="text-sm md:text-xl text-muted-foreground text-pretty">
            A escolha é sua... 
          </p>
        </div>

        {/* Buttons */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 min-h-[180px] md:min-h-[200px]">
          {/* Yes Button */}
          <Button
            onClick={handleYesClick}
            size="lg"
            className="text-base md:text-lg px-8 md:px-12 py-6 md:py-8 bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 relative z-20"
            style={{
              transform: `scale(${yesButtonSize})`,
              transition: "transform 0.3s ease",
            }}
          >
            <Heart className="mr-2 w-5 h-5 md:w-6 md:h-6 fill-current" />
            Sim! 💕
          </Button>

          {/* No Button - Escapes on hover */}
          <Button
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            variant="outline"
            size="lg"
            className="text-base md:text-lg px-8 md:px-12 py-6 md:py-8 border-2 transition-all duration-200 absolute sm:relative bg-background"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) scale(${noButtonSize})`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <Frown className="mr-2 w-5 h-5 md:w-6 md:h-6" />
            Não...
          </Button>
        </div>

        {/* Encouraging messages */}
        {attempts > 0 && (
          <div className="animate-in fade-in-up duration-500 px-2">
            <p className="text-sm md:text-lg text-muted-foreground italic">
              {attempts < 3 && "Você tem certeza? 🥺"}
              {attempts >= 3 && attempts < 6 && "Vamos lá, dá uma chance! 💕"}
              {attempts >= 6 && attempts < 10 && "O botão 'Sim' tá crescendo, é um sinal! ✨"}
              {attempts >= 10 && "Já tentou tantas vezes, só aceita logo! 😄"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
