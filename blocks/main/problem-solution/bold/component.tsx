import { Button } from "@/components/ui/button"
import { ArrowRight, Settings, TrendingDown, AlertTriangle, Zap, TrendingUp, Shield, Sparkles } from "lucide-react"

interface ProblemSolutionProps {
  content: {
    data?: {
      title: string
      subtitle: string
      problems: Array<{
        title: string
        description: string
        icon: string
      }>
      solutions: Array<{
        title: string
        description: string
        icon: string
      }>
      ctaText: string
      ctaLink: string
    }
  }
}

const iconMap = {
  settings: Settings,
  "trending-down": TrendingDown,
  "alert-triangle": AlertTriangle,
  zap: Zap,
  "trending-up": TrendingUp,
  shield: Shield
}

export default function ProblemSolution({ content }: ProblemSolutionProps) {
  const data = content.data || {
    title: "The Problem We Solve",
    subtitle: "Modern development teams face complex challenges. We provide the solutions you need to succeed.",
    problems: [
      {
        title: "Complex Setup & Configuration",
        description: "Spending weeks on boilerplate code and configuration instead of building features.",
        icon: "settings"
      },
      {
        title: "Scaling Performance Issues",
        description: "Applications slow down as they grow, affecting user experience and business growth.",
        icon: "trending-down"
      },
      {
        title: "Security Vulnerabilities",
        description: "Constant worry about security breaches and compliance requirements.",
        icon: "alert-triangle"
      }
    ],
    solutions: [
      {
        title: "Zero-Config Deployment",
        description: "Deploy in minutes with our pre-configured, production-ready templates.",
        icon: "zap"
      },
      {
        title: "Auto-Scaling Infrastructure",
        description: "Built-in performance optimization that scales automatically with your traffic.",
        icon: "trending-up"
      },
      {
        title: "Enterprise-Grade Security",
        description: "Bank-level security with automatic updates and compliance monitoring.",
        icon: "shield"
      }
    ],
    ctaText: "See How It Works",
    ctaLink: "/demo"
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-yellow-500/5" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full px-6 py-2 mb-8">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Problem & Solution</span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Problems */}
          <div>
            <h3 className="text-3xl font-bold text-red-600 mb-12 text-center lg:text-left flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              Common Challenges
            </h3>
            <div className="space-y-6">
              {data.problems.map((problem, index) => {
                const IconComponent = iconMap[problem.icon as keyof typeof iconMap] || Settings
                return (
                  <div key={index} className="group p-8 bg-white rounded-2xl border-2 border-red-100 hover:border-red-200 transition-all duration-300 hover:shadow-lg hover:shadow-red-100/50">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-7 w-7 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {problem.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {problem.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-3xl font-bold text-green-600 mb-12 text-center lg:text-left flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              Our Solutions
            </h3>
            <div className="space-y-6">
              {data.solutions.map((solution, index) => {
                const IconComponent = iconMap[solution.icon as keyof typeof iconMap] || Zap
                return (
                  <div key={index} className="group p-8 bg-white rounded-2xl border-2 border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg hover:shadow-green-100/50">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-7 w-7 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {solution.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="text-center mt-20">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-xl py-6 px-10 rounded-2xl shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-200"
          >
            {data.ctaText}
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
