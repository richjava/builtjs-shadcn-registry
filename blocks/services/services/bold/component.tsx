import { Button } from "@/components/ui/button"
import { ArrowRight, Code, TrendingUp, Palette, Clock, CheckCircle, Star, Zap } from "lucide-react"

interface ServicesProps {
  content: {
    data?: {
      title: string
      subtitle: string
      services: Array<{
        name: string
        description: string
        duration: string
        deliverables: string[]
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

export default function Services({ content }: ServicesProps) {
  const data = content.data || {
    title: "Premium Services",
    subtitle: "Transform your business with our comprehensive service solutions designed for maximum impact and sustainable growth.",
    services: [
      {
        name: "Enterprise Web Development",
        description: "Full-stack web applications and custom solutions built with cutting-edge technologies, enterprise-grade security, and scalable architecture.",
        duration: "6-12 weeks",
        deliverables: [
          "Custom web application",
          "API development & integration",
          "Database architecture & optimization",
          "Security implementation & testing",
          "Performance optimization",
          "Ongoing maintenance & support"
        ],
        icon: "code"
      },
      {
        name: "Strategic Digital Marketing",
        description: "Comprehensive digital marketing strategies that drive growth, engagement, and measurable ROI through multi-channel campaigns and data-driven optimization.",
        duration: "4-8 weeks",
        deliverables: [
          "Complete marketing strategy",
          "Multi-channel campaign setup",
          "Content strategy & calendar",
          "Social media management",
          "SEO & SEM optimization",
          "Analytics & reporting dashboard"
        ],
        icon: "trending-up"
      },
      {
        name: "Complete Brand Identity",
        description: "End-to-end brand development from strategic positioning to visual implementation, creating memorable and impactful brand experiences.",
        duration: "8-12 weeks",
        deliverables: [
          "Brand strategy & positioning",
          "Logo & visual identity system",
          "Comprehensive brand guidelines",
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
    <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.08%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
      
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
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code
            return (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {service.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-2" />
                        <div className="flex items-center text-purple-300">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="font-semibold">{service.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                    {service.description}
                  </p>
                  
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <Zap className="h-4 w-4 text-pink-400 mr-2" />
                      <h4 className="text-sm font-semibold text-white">What You'll Get:</h4>
                    </div>
                    <ul className="space-y-3">
                      {service.deliverables.map((deliverable, deliverableIndex) => (
                        <li key={deliverableIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-300 text-sm font-medium">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-8 py-4 text-lg">
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
