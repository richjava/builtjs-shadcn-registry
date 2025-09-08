import { Button } from "@/components/ui/button"
import { ArrowRight, RefreshCw, Settings, Target, Check } from "lucide-react"
import Image from "next/image"

interface SolutionsProps {
  content: {
    data?: {
      title: string
      subtitle: string
      solutions: Array<{
        title: string
        description: string
        benefits: string[]
        icon: string
        image: string
      }>
      ctaText: string
      ctaLink: string
    }
  }
}

const iconMap = {
  "refresh-cw": RefreshCw,
  settings: Settings,
  target: Target
}

export default function Solutions({ content }: SolutionsProps) {
  const data = content.data || {
    title: "Business Solutions",
    subtitle: "We solve complex business challenges with innovative, data-driven solutions.",
    solutions: [
      {
        title: "Digital Transformation",
        description: "Modernize your business processes with cutting-edge technology solutions.",
        benefits: [
          "Increased efficiency",
          "Reduced costs",
          "Better customer experience",
          "Competitive advantage"
        ],
        icon: "refresh-cw",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
      },
      {
        title: "Process Optimization",
        description: "Streamline operations and eliminate bottlenecks for maximum productivity.",
        benefits: [
          "Faster delivery times",
          "Higher quality output",
          "Reduced waste",
          "Improved team morale"
        ],
        icon: "settings",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
      },
      {
        title: "Growth Strategy",
        description: "Scale your business with proven strategies and market insights.",
        benefits: [
          "Market expansion",
          "Revenue growth",
          "Brand recognition",
          "Long-term sustainability"
        ],
        icon: "target",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop"
      }
    ],
    ctaText: "Discuss Your Project",
    ctaLink: "/consultation"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {data.solutions.map((solution, index) => {
            const IconComponent = iconMap[solution.icon as keyof typeof iconMap] || RefreshCw
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {solution.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {solution.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
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
