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

export default function ProblemSolutionNeobrutalism({ content }: ProblemSolutionProps) {
  const data = content.data || {
    title: "The Problem We Solve",
    subtitle: "Modern development teams face complex challenges. We provide the solutions you need to succeed.",
    problems: [
      {
        title: "Complex Setup & Configuration",
        description: "Hours spent on boilerplate code, configuration files, and environment setup instead of building features.",
        icon: "settings"
      },
      {
        title: "Slow Development Cycles",
        description: "Long build times, slow deployments, and inefficient development workflows slowing down your team.",
        icon: "trending-down"
      },
      {
        title: "Security Vulnerabilities",
        description: "Constant security updates, compliance requirements, and potential breaches keeping you up at night.",
        icon: "alert-triangle"
      }
    ],
    solutions: [
      {
        title: "Pre-configured Templates",
        description: "Jumpstart your projects with battle-tested templates and automated configuration.",
        icon: "zap"
      },
      {
        title: "Lightning Fast Performance",
        description: "Optimized builds, instant deployments, and streamlined workflows that accelerate development.",
        icon: "trending-up"
      },
      {
        title: "Enterprise Security",
        description: "Built-in security features, compliance tools, and expert support to protect your applications.",
        icon: "shield"
      }
    ],
    ctaText: "See How It Works",
    ctaLink: "/demo"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Problems */}
          <div className="border-4 border-black p-8 bg-red-100 shadow-[8px_8px_0px_#000000]">
            <h3 className="text-2xl font-bold text-black mb-8 border-b-4 border-black pb-4 text-center">
              ❌ Problems
            </h3>
            <div className="space-y-6">
              {data.problems.map((problem, index) => {
                const IconComponent = iconMap[problem.icon as keyof typeof iconMap] || Settings
                return (
                  <div key={index} className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_#000000]">
                    <div className="flex items-start mb-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-red-500 border-2 border-black rounded-full mr-4 shadow-[2px_2px_0px_#000000]">
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-black border-b-2 border-black pb-1">
                        {problem.title}
                      </h4>
                    </div>
                    <p className="text-black leading-relaxed border-l-4 border-black pl-4">
                      {problem.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Solutions */}
          <div className="border-4 border-black p-8 bg-green-100 shadow-[8px_8px_0px_#000000]">
            <h3 className="text-2xl font-bold text-black mb-8 border-b-4 border-black pb-4 text-center">
              ✅ Solutions
            </h3>
            <div className="space-y-6">
              {data.solutions.map((solution, index) => {
                const IconComponent = iconMap[solution.icon as keyof typeof iconMap] || Zap
                return (
                  <div key={index} className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_#000000]">
                    <div className="flex items-start mb-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-green-500 border-2 border-black rounded-full mr-4 shadow-[2px_2px_0px_#000000]">
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-black border-b-2 border-black pb-1">
                        {solution.title}
                      </h4>
                    </div>
                    <p className="text-black leading-relaxed border-l-4 border-black pl-4">
                      {solution.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-electric-blue text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 text-lg px-8 py-4"
          >
            {data.ctaText}
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
