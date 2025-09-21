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

export default function SolutionsNeobrutalism({ content }: SolutionsProps) {
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
          "Reduced errors",
          "Lower operational costs",
          "Improved quality"
        ],
        icon: "settings",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
      },
      {
        title: "Growth Strategy",
        description: "Data-driven strategies to accelerate growth and expand market reach.",
        benefits: [
          "Market expansion",
          "Revenue growth",
          "Customer acquisition",
          "Brand recognition"
        ],
        icon: "target",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
      }
    ],
    ctaText: "Get Your Solution",
    ctaLink: "/contact"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {data.solutions.map((solution, index) => {
            const IconComponent = iconMap[solution.icon as keyof typeof iconMap] || RefreshCw
            return (
              <div key={index} className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden">
                <div className="relative h-48 border-b-4 border-black">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 inline-flex items-center justify-center w-12 h-12 bg-electric-blue border-4 border-black rounded-full shadow-[4px_4px_0px_#000000]">
                    <IconComponent className="h-6 w-6 text-black" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-2">
                    {solution.title}
                  </h3>
                  
                  <p className="text-black mb-4 border-l-4 border-black pl-4">
                    {solution.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-black mb-3 border-b-2 border-black pb-1">
                      Key Benefits:
                    </h4>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center border-2 border-black p-2 bg-green-100 shadow-[2px_2px_0px_#000000]">
                          <div className="inline-flex items-center justify-center w-5 h-5 bg-green-500 border-2 border-black rounded-full mr-3 shadow-[1px_1px_0px_#000000]">
                            <Check className="h-2 w-2 text-white" />
                          </div>
                          <span className="text-sm font-bold text-black">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full bg-electric-blue text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-neon-green text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 text-lg px-8 py-4"
          >
            {data.ctaText}
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
