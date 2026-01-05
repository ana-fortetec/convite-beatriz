"use client"

import { Button } from "@/components/ui/button"
import { Heart, Sparkles } from "lucide-react"

interface WelcomeScreenProps {
  onNext: () => void
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-background to-accent/20 p-4">
      {/* Floating flowers animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-accent fill-accent opacity-20"
            size={32}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse-soft ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8 animate-in fade-in-up duration-1000">
        {/* Sparkle icon */}
        <div className="flex justify-center">
          <div className="relative">
            <Sparkles className="w-16 h-16 text-accent animate-pulse" />
            <Heart className="absolute -top-2 -right-2 w-8 h-8 text-primary fill-primary animate-bounce" />
          </div>
        </div>

        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
            Você foi selecionada para uma experiência gastronômica
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-pretty leading-relaxed">
            Um convite exclusivo para <span className="text-primary font-semibold">Mbeatriz</span>, porque o algoritmo
            do meu cérebro só indica você
          </p>
        </div>

        {/* Decorative hearts */}
        <div className="flex justify-center gap-2">
          <Heart className="w-6 h-6 text-accent fill-accent animate-pulse" />
          <Heart className="w-6 h-6 text-accent fill-accent animate-pulse" style={{ animationDelay: "0.2s" }} />
          <Heart className="w-6 h-6 text-accent fill-accent animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            onClick={onNext}
            size="lg"
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Ver os planos disponíveis
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
