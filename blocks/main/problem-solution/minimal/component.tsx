import { Button } from "@/components/ui/button"
import { ArrowRight, Settings, TrendingDown, AlertTriangle, Zap, TrendingUp, Shield } from "lucide-react"

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Problems */}
          <div>
            <h3 className="text-xl font-light text-gray-700 mb-12 text-center lg:text-left">
              Common Challenges
            </h3>
            <div className="space-y-8">
              {data.problems.map((problem, index) => {
                const IconComponent = iconMap[problem.icon as keyof typeof iconMap] || Settings
                return (
                  <div key={index} className="flex items-start space-x-6 p-0 border-0 border-b border-gray-200 pb-8">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <IconComponent className="h-4 w-4 text-gray-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">
                        {problem.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-xl font-light text-gray-700 mb-12 text-center lg:text-left">
              Our Solutions
            </h3>
            <div className="space-y-8">
              {data.solutions.map((solution, index) => {
                const IconComponent = iconMap[solution.icon as keyof typeof iconMap] || Zap
                return (
                  <div key={index} className="flex items-start space-x-6 p-0 border-0 border-b border-gray-200 pb-8">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <IconComponent className="h-4 w-4 text-gray-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">
                        {solution.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {solution.description}
                      </p>
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
