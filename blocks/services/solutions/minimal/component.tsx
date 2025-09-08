import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Users, TrendingUp, CheckCircle, Target } from "lucide-react"

interface SolutionsProps {
  content: {
    data?: {
      title: string
      subtitle: string
      solutions: Array<{
        name: string
        description: string
        outcome: string
        benefits: string[]
        icon: string
      }>
      ctaText: string
      ctaLink: string
    }
  }
}

const iconMap = {
  zap: Zap,
  users: Users,
  "trending-up": TrendingUp
}

export default function Solutions({ content }: SolutionsProps) {
  const data = content.data || {
    title: "Business Solutions",
    subtitle: "Tailored solutions to address your specific business challenges.",
    solutions: [
      {
        name: "Digital Transformation",
        description: "Modernize your business processes with cutting-edge technology solutions.",
        outcome: "Increased efficiency by 40%",
        benefits: [
          "Streamlined workflows",
          "Reduced manual tasks",
          "Better data insights"
        ],
        icon: "zap"
      },
      {
        name: "Customer Experience",
        description: "Enhance customer satisfaction through improved user experiences and support.",
        outcome: "25% higher customer retention",
        benefits: [
          "Improved user interface",
          "Faster response times",
          "Personalized experiences"
        ],
        icon: "users"
      },
      {
        name: "Growth Strategy",
        description: "Scale your business with data-driven strategies and market expansion.",
        outcome: "3x revenue growth potential",
        benefits: [
          "Market analysis",
          "Strategic planning",
          "Performance tracking"
        ],
        icon: "trending-up"
      }
    ],
    ctaText: "Get Solution",
    ctaLink: "/solutions"
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {data.solutions.map((solution, index) => {
            const IconComponent = iconMap[solution.icon as keyof typeof iconMap] || Zap
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <IconComponent className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {solution.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {solution.description}
                </p>
                
                <div className="flex items-center mb-4 p-2 bg-green-50 rounded-md">
                  <Target className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-800">
                    {solution.outcome}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {solution.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-xs">
                        <CheckCircle className="h-3 w-3 text-gray-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            {data.ctaText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
