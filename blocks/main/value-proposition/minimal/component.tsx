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

export default function ValueProposition({ content }: ValuePropositionProps) {
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {data.benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon as keyof typeof iconMap] || Zap
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-8 group-hover:bg-gray-200 transition-colors duration-300">
                  <IconComponent className="h-5 w-5 text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light text-sm">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gray-900 text-white hover:bg-gray-800 font-medium text-lg py-4 px-8 rounded-none border-0"
          >
            {data.ctaText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
