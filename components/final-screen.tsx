"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Frown, ArrowLeft } from "lucide-react"

interface FinalScreenProps {
  selectedPlan: "classico" | "tematica" | "inimigos" | null
  onBack: () => void
}

export function FinalScreen({ selectedPlan, onBack }: FinalScreenProps) {
  // Estado para controlar a posição exata (top/left)
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const [noButtonSize, setNoButtonSize] = useState(1)
  const [attempts, setAttempts] = useState(0)
  
  // Ref para capturar o tamanho da tela/container
  const containerRef = useRef<HTMLDivElement>(null)
  // Ref para o botão não, para sabermos o tamanho dele antes de mover
  const noBtnRef = useRef<HTMLButtonElement>(null)

  const planNames = {
    classico: "um Clássico Minimalista",
    tematica: "uma Experiência Temática",
    inimigos: 'um Plano "Inimigos do Fim"',
  }

  const handleNoInteraction = () => {
    if (!containerRef.current || !noBtnRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const btnRect = noBtnRef.current.getBoundingClientRect()

    // Margem de segurança para o botão não colar na borda exata
    const safeMargin = 20

    // Calcula a área máxima onde o botão pode aparecer dentro do container
    // Subtraímos o tamanho do botão para ele não nascer cortado na direita/fundo
    const maxLeft = containerRect.width - btnRect.width - safeMargin
    const maxTop = containerRect.height - btnRect.height - safeMargin

    // Gera coordenadas aleatórias DENTRO desses limites seguros
    // Math.max garante que não seja menor que a margem (não sai pela esquerda/topo)
    const newLeft = Math.max(safeMargin, Math.random() * maxLeft)
    const newTop = Math.max(safeMargin, Math.random() * maxTop)

    setPosition({ left: newLeft, top: newTop })
    setNoButtonSize(Math.max(0.6, noButtonSize - 0.05)) // Diminui um pouco menos agressivamente
    setAttempts((prev) => prev + 1)
  }

  const handleYesClick = () => {
    const planName = selectedPlan ? planNames[selectedPlan] : "a experiência gastronômica"
    const message = encodeURIComponent(`Oi! Eu aceito o convite para ${planName}! (:`)
    const phoneNumber = "5599991443864" 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const yesButtonSize = Math.min(2.5, 1 + attempts * 0.15)

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/20 via-background to-secondary p-3 md:p-4"
    >
      {/* Background Hearts */}
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

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center space-y-6 md:space-y-12 animate-in fade-in-up duration-700 flex flex-col items-center">
        {/* Question */}
        <div className="space-y-2 md:space-y-4 px-2">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
            {selectedPlan ? `Aceita o convite para ${planNames[selectedPlan]}?` : "Então, aceita o convite?"}
          </h2>
          <p className="text-sm md:text-xl text-muted-foreground text-pretty">
            A escolha é sua... 
          </p>
        </div>

        {/* Buttons Container */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 min-h-[120px] w-full">
          
          {/* Yes Button */}
          <Button
            onClick={handleYesClick}
            size="lg"
            className="text-base md:text-lg px-8 md:px-12 py-6 md:py-8 bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 relative z-20"
            style={{
              transform: `scale(${yesButtonSize})`,
              transition: "transform 0.3s ease",
            }}
          >
            <Heart className="mr-2 w-5 h-5 md:w-6 md:h-6 fill-current" />
            Sim! 💕
          </Button>

          {/* No Button */}
          <Button
            ref={noBtnRef}
            onMouseEnter={handleNoInteraction}
            onTouchStart={(e) => {
               // Previne o clique real no mobile para dar tempo de fugir
               e.preventDefault(); 
               handleNoInteraction();
            }}
            variant="outline"
            size="lg"
            className={`text-base md:text-lg px-8 md:px-12 py-6 md:py-8 border-2 transition-all duration-200 bg-background z-50 ${position ? 'absolute' : 'relative'}`}
            style={{
              // Se tiver position (já interagiu), usa absolute top/left.
              // Se não, segue o fluxo normal (relative) ao lado do botão Sim.
              top: position ? position.top : 'auto',
              left: position ? position.left : 'auto',
              transform: `scale(${noButtonSize})`,
              transition: "top 0.2s ease-out, left 0.2s ease-out, transform 0.2s ease",
            }}
          >
            <Frown className="mr-2 w-5 h-5 md:w-6 md:h-6" />
            Não...
          </Button>
        </div>

        {/* Encouraging messages - Fixed positioning to avoid layout shift */}
        <div className="h-8 md:h-10 mt-4 px-2">
            {attempts > 0 && (
            <p className="text-sm md:text-lg text-muted-foreground italic animate-in fade-in duration-300">
                {attempts < 3 && "Você tem certeza? 🥺"}
                {attempts >= 3 && attempts < 6 && "Vamos lá, dá uma chance! 💕"}
                {attempts >= 6 && attempts < 10 && "O botão 'Sim' tá crescendo, é um sinal! ✨"}
                {attempts >= 10 && "Sua persistência é admirável, mas eu vou ganhar! 😄"}
            </p>
            )}
        </div>
      </div>
    </div>
  )
}