"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IceCream, Gamepad2, Wine, Calendar, Clock, MapPin } from "lucide-react"

interface PlansScreenProps {
  onPlanSelect: (plan: "classico" | "tematica" | "inimigos") => void
}

export function PlansScreen({ onPlanSelect }: PlansScreenProps) {
  const plans = [
    {
      id: "classico" as const,
      icon: IceCream,
      title: "O Clássico Minimalista",
      description: "Ir no Chiquinho Sorvetes comer uma casquinha e jogar conversa fora",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      id: "tematica" as const,
      icon: Gamepad2,
      title: "A Experiência Temática",
      description: "Smash Bros e diversão garantida",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: "inimigos" as const,
      icon: Wine,
      title: 'O Plano "Inimigos do Fim"',
      description: "A gente ir em um barzinho da sua preferência (a discutir)",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background p-3 md:p-4">
      <div className="max-w-5xl mx-auto w-full space-y-4 md:space-y-8 animate-in fade-in-up duration-700">
        {/* Header */}
        <div className="text-center space-y-2 md:space-y-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Escolha sua aventura
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground text-pretty">
            Três opções incríveis, todas com a melhor companhia
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-3 md:gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <Card
                key={index}
                onClick={() => onPlanSelect(plan.id)}
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50 cursor-pointer active:scale-95"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <CardHeader className="pb-2 md:pb-6">
                  <div
                    className={`w-10 h-10 md:w-16 md:h-16 rounded-full ${plan.bgColor} flex items-center justify-center mb-2 md:mb-4`}
                  >
                    <Icon className={`w-5 h-5 md:w-8 md:h-8 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-base md:text-xl text-balance">{plan.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs md:text-base text-pretty leading-relaxed">
                    {plan.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Detalhes do Encontro */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
          <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-2xl font-bold text-center text-foreground mb-3 md:mb-6">
                Detalhes do Encontro
              </h3>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {/* Data e Horário */}
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-2 md:gap-3">
                    <Calendar className="w-4 h-4 md:w-6 md:h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm md:text-base">Data</p>
                      <p className="text-muted-foreground text-sm md:text-base">06/01/2026</p>
                      <p className="text-xs md:text-sm text-muted-foreground/80 italic">
                        (ou no dia de sua preferência )
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3">
                    <Clock className="w-4 h-4 md:w-6 md:h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm md:text-base">Horário</p>
                      <p className="text-muted-foreground text-sm md:text-base">19:30</p>
                      <p className="text-xs md:text-sm text-muted-foreground/80 italic">
                        (ou no horário de sua preferência)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logística */}
                <div className="space-y-3">
                  <div className="flex items-start gap-2 md:gap-3">
                    <MapPin className="w-4 h-4 md:w-6 md:h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-2 text-sm md:text-base">Logística</p>
                      <div className="space-y-2 text-muted-foreground text-xs md:text-base">
                        <p className="leading-relaxed">
                          Eu busco você em casa <span className="font-semibold text-foreground">OU</span> você pode me
                          buscar na minha casa já que agora você é recém motorizada!
                        </p>
                        <p className="text-xs md:text-sm italic text-primary font-medium">
                          Fica da sua preferência mesmo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info adicional */}
        <div className="text-center">
          <p className="text-xs md:text-sm text-muted-foreground italic">
            Clique em um dos planos acima para continuar
          </p>
        </div>
      </div>
    </div>
  )
}
