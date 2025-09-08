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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Problems */}
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-8 text-center lg:text-left">
              Common Challenges
            </h3>
            <div className="space-y-6">
              {data.problems.map((problem, index) => {
                const IconComponent = iconMap[problem.icon as keyof typeof iconMap] || Settings
                return (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg border border-red-200">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {problem.title}
                      </h4>
                      <p className="text-gray-600">
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
            <h3 className="text-2xl font-bold text-green-600 mb-8 text-center lg:text-left">
              Our Solutions
            </h3>
            <div className="space-y-6">
              {data.solutions.map((solution, index) => {
                const IconComponent = iconMap[solution.icon as keyof typeof iconMap] || Zap
                return (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg border border-green-200">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {solution.title}
                      </h4>
                      <p className="text-gray-600">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
