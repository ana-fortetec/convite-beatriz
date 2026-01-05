"use client"

import { useState } from "react"
import { WelcomeScreen } from "@/components/welcome-screen"
import { PlansScreen } from "@/components/plans-screen"
import { FinalScreen } from "@/components/final-screen"

type Plan = "classico" | "tematica" | "inimigos" | null

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "plans" | "final">("welcome")
  const [selectedPlan, setSelectedPlan] = useState<Plan>(null)

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan)
    setCurrentScreen("final")
  }

  const handleBackToPlans = () => {
    setSelectedPlan(null)
    setCurrentScreen("plans")
  }

  return (
    <main className="min-h-screen">
      {currentScreen === "welcome" && <WelcomeScreen onNext={() => setCurrentScreen("plans")} />}
      {currentScreen === "plans" && <PlansScreen onPlanSelect={handlePlanSelect} />}
      {currentScreen === "final" && <FinalScreen selectedPlan={selectedPlan} onBack={handleBackToPlans} />}
    </main>
  )
}
