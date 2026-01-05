"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Frown, ArrowLeft } from "lucide-react"

interface FinalScreenProps {
  selectedPlan: "classico" | "tematica" | "inimigos" | null
  onBack: () => void
}

export function FinalScreen({ selectedPlan, onBack }: FinalScreenProps) {
  // Estado para controlar a posição (top/left)
  // null significa "posição original ao lado do Sim"
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const [attempts, setAttempts] = useState(0)
  
  // Refs para medir a tela e o botão
  const containerRef = useRef<HTMLDivElement>(null)
  const noBtnRef = useRef<HTMLButtonElement>(null)

  const planNames = {
    classico: "um Clássico Minimalista",
    tematica: "uma Experiência Temática",
    inimigos: 'um Plano "Inimigos do Fim"',
  }

  const handleNoInteraction = () => {
    // Se não tiver as referências, não faz nada
    if (!containerRef.current || !noBtnRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const btnRect = noBtnRef.current.getBoundingClientRect()

    // Margem de segurança para o botão não colar na borda (30px)
    const padding = 30

    // Calcula a largura e altura DISPONÍVEIS (subtraindo o tamanho do botão e padding)
    // Isso garante matematicamente que ele não pode sair da área
    const maxLeft = containerRect.width - btnRect.width - padding
    const maxTop = containerRect.height - btnRect.height - padding

    // Gera coordenadas aleatórias mas força a serem no mínimo 'padding' (lado esquerdo/topo)
    // e no máximo 'maxLeft/maxTop' (lado direito/fundo)
    const newLeft = Math.max(padding, Math.random() * maxLeft)
    const newTop = Math.max(padding, Math.random() * maxTop)

    setPosition({ left: newLeft, top: newTop })
    setAttempts((prev) => prev + 1)
  }

  // Função para resetar se a tela for redimensionada (evita bugs no resize)
  useEffect(() => {
    const handleResize = () => setPosition(null)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleYesClick = () => {
    const planName = selectedPlan ? planNames[selectedPlan] : "a experiência gastronômica"
    const message = encodeURIComponent(`Oi! Eu aceito o convite para ${planName}! (:`)
    const phoneNumber = "5599991443864" 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  // O botão Sim cresce, mas limitamos a 1.5x para não empurrar tudo para fora da tela
  const yesButtonSize = Math.min(1.5, 1 + attempts * 0.1)

  return (
    <div
      ref={containerRef}
      // h-screen e overflow-hidden GARANTEM que a área de fuga é exatamente o que a pessoa vê
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/20 via-background to-secondary"
    >
      {/* Background Decorativo */}
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

      <Button onClick={onBack} variant="ghost" size="sm" className="absolute top-4 left-4 z-50 text-xs md:text-sm">
        <ArrowLeft className="mr-1 w-3 h-3 md:w-4 md:h-4" />
        Voltar
      </Button>

      {/* Container Central do Conteúdo */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center justify-center space-y-8 animate-in fade-in-up duration-700">
        
        {/* Texto da Pergunta */}
        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance leading-tight drop-shadow-sm">
            {selectedPlan ? `Aceita o convite para ${planNames[selectedPlan]}?` : "Então, aceita o convite?"}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            A escolha é sua... 
          </p>
        </div>

        {/* Área dos Botões */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full min-h-[100px]">
          
          {/* Botão SIM */}
          <Button
            onClick={handleYesClick}
            size="lg"
            className="text-lg px-10 py-8 bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 relative z-20"
            style={{
              transform: `scale(${yesButtonSize})`,
              transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
          >
            <Heart className="mr-2 w-6 h-6 fill-current animate-pulse" />
            Sim! 💕
          </Button>

          {/* Botão NÃO */}
          <Button
            ref={noBtnRef}
            // Eventos para mouse e touch
            onMouseEnter={handleNoInteraction}
            onTouchStart={(e) => {
               e.preventDefault(); // Impede o clique real no celular
               handleNoInteraction();
            }}
            variant="outline"
            size="lg"
            className={`
              text-lg px-10 py-8 border-2 bg-background font-semibold shadow-md
              transition-all duration-300 ease-out
              ${position ? 'absolute z-50' : 'relative z-20'} 
            `}
            // Se position existir (já interagiu), aplica absolute top/left.
            // Se for null (estado inicial), o botão fica relative ao lado do Sim.
            style={position ? {
              top: position.top,
              left: position.left,
            } : {}}
          >
            <Frown className="mr-2 w-6 h-6" />
            Não...
          </Button>
        </div>

        {/* Frases Divertidas */}
        <div className="h-12 flex items-center justify-center text-center px-4">
            {attempts > 0 && (
            <p className="text-sm md:text-lg text-muted-foreground italic animate-in fade-in slide-in-from-bottom-2 duration-300">
                {attempts < 3 && "Você tem certeza? 🥺"}
                {attempts >= 3 && attempts < 6 && "Pode parar de tentar clicar no não! 💕"}
                {attempts >= 6 && attempts < 10 && "O botão 'Sim' tá enorme, clica nele! ✨"}
                {attempts >= 10 && "Sua persistência é admirável, mas eu vou ganhar! 😄"}
            </p>
            )}
        </div>
      </div>
    </div>
  )
}