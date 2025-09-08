import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Users, TrendingUp, Sparkles } from "lucide-react"

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

const benefitColors = [
  "from-yellow-400 to-orange-500",
  "from-blue-400 to-cyan-500",
  "from-purple-400 to-pink-500",
  "from-green-400 to-emerald-500"
]

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
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-400/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full px-6 py-2 mb-8">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Value Proposition</span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {data.benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon as keyof typeof iconMap] || Zap
            const colorClass = benefitColors[index % benefitColors.length]
            return (
              <div key={index} className="group text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${colorClass} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xl py-6 px-10 rounded-2xl shadow-2xl hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-200"
          >
            {data.ctaText}
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
