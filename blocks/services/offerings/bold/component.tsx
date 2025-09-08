import { Button } from "@/components/ui/button"
import { ArrowRight, Code, TrendingUp, Palette, Check, Star } from "lucide-react"

interface OfferingsProps {
  content: {
    data?: {
      title: string
      subtitle: string
      offerings: Array<{
        name: string
        description: string
        price: string
        features: string[]
        icon: string
      }>
      ctaText: string
      ctaLink: string
    }
  }
}

const iconMap = {
  code: Code,
  "trending-up": TrendingUp,
  palette: Palette
}

export default function Offerings({ content }: OfferingsProps) {
  const data = content.data || {
    title: "Premium Service Packages",
    subtitle: "Transform your business with our comprehensive service offerings designed for maximum impact and growth.",
    offerings: [
      {
        name: "Enterprise Web Development",
        description: "Full-stack web applications and custom solutions built with cutting-edge technologies and enterprise-grade security.",
        price: "Starting at $15,000",
        features: [
          "Custom web applications",
          "API development & integration",
          "Database architecture",
          "Security implementation",
          "Performance optimization",
          "Ongoing maintenance"
        ],
        icon: "code"
      },
      {
        name: "Strategic Digital Marketing",
        description: "Comprehensive digital marketing strategies that drive growth, engagement, and measurable ROI for your business.",
        price: "Starting at $8,000",
        features: [
          "Multi-channel campaigns",
          "Content strategy & creation",
          "Social media management",
          "SEO & SEM optimization",
          "Analytics & reporting",
          "Conversion optimization"
        ],
        icon: "trending-up"
      },
      {
        name: "Complete Brand Identity",
        description: "End-to-end brand development from concept to implementation, creating memorable and impactful brand experiences.",
        price: "Starting at $12,000",
        features: [
          "Brand strategy & positioning",
          "Logo & visual identity",
          "Brand guidelines & standards",
          "Marketing collateral design",
          "Website design & development",
          "Brand implementation support"
        ],
        icon: "palette"
      }
    ],
    ctaText: "Start Your Project",
    ctaLink: "/contact"
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {data.offerings.map((offering, index) => {
            const IconComponent = iconMap[offering.icon as keyof typeof iconMap] || Code
            return (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {offering.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-2" />
                        <p className="text-2xl font-bold text-blue-400">
                          {offering.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                    {offering.description}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-white mb-4">What's Included:</h4>
                    <ul className="space-y-3">
                      {offering.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-300 text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 text-lg">
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
