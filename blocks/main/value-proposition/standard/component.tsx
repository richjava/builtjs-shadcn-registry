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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {data.benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon as keyof typeof iconMap] || Zap
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
