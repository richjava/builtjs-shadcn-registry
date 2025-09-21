import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Users, TrendingUp } from "lucide-react"

interface ValuePropositionProps {
  content: {
    data?: {
      title: string
      subtitle: string
      benefits: Array<{
        icon: string
        title: string
        description: string
      }>
      ctaText: string
      ctaLink: string
    }
  }
}

const iconMap = {
  zap: Zap,
  shield: Shield,
  users: Users,
  "trending-up": TrendingUp
}

export default function ValuePropositionNeobrutalism({ content }: ValuePropositionProps) {
  const data = content.data || {
    title: "Why Choose Our Platform",
    subtitle: "We provide everything you need to build, deploy, and scale your applications with confidence.",
    benefits: [
      {
        icon: "zap",
        title: "Lightning Fast",
        description: "Built for performance with optimized code and modern architecture patterns."
      },
      {
        icon: "shield",
        title: "Enterprise Ready",
        description: "Security-first approach with enterprise-grade features and compliance."
      },
      {
        icon: "users",
        title: "Team Collaboration",
        description: "Seamless collaboration tools designed for modern development teams."
      },
      {
        icon: "trending-up",
        title: "Scalable Growth",
        description: "Grows with your business from startup to enterprise scale."
      }
    ],
    ctaText: "Learn More",
    ctaLink: "/features"
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {data.benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon as keyof typeof iconMap] || Zap
            return (
              <div key={index} className="text-center border-2 border-black p-6 bg-white shadow-[4px_4px_0px_#000000]">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-electric-blue border-4 border-black rounded-full mb-6 shadow-[4px_4px_0px_#000000]">
                  <IconComponent className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                  {benefit.title}
                </h3>
                <p className="text-black leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-neon-green text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
          >
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
