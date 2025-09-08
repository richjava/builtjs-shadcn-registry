import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Users, TrendingUp, CheckCircle, Target, Star, Award } from "lucide-react"

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
    title: "Strategic Business Solutions",
    subtitle: "Transform your business with our comprehensive solutions designed to drive measurable results and sustainable growth across all areas of your organization.",
    solutions: [
      {
        name: "Enterprise Digital Transformation",
        description: "Complete digital overhaul of your business processes, systems, and operations using cutting-edge technologies and industry best practices.",
        outcome: "Up to 60% efficiency improvement",
        benefits: [
          "End-to-end process automation",
          "Advanced analytics & reporting",
          "Cloud infrastructure migration",
          "AI-powered decision making",
          "Scalable system architecture",
          "24/7 monitoring & support"
        ],
        icon: "zap"
      },
      {
        name: "Customer Experience Excellence",
        description: "Revolutionize customer interactions through personalized experiences, omnichannel support, and data-driven customer journey optimization.",
        outcome: "40% increase in customer satisfaction",
        benefits: [
          "Omnichannel customer support",
          "Personalized user experiences",
          "Real-time customer analytics",
          "Proactive issue resolution",
          "Customer feedback integration",
          "Loyalty program optimization"
        ],
        icon: "users"
      },
      {
        name: "Strategic Growth Acceleration",
        description: "Accelerate business growth through market expansion, competitive analysis, and data-driven strategic planning with measurable ROI.",
        outcome: "5x revenue growth potential",
        benefits: [
          "Comprehensive market analysis",
          "Competitive intelligence",
          "Strategic roadmap development",
          "Performance metrics & KPIs",
          "Growth opportunity identification",
          "Long-term sustainability planning"
        ],
        icon: "trending-up"
      }
    ],
    ctaText: "Start Your Transformation",
    ctaLink: "/solutions"
  }

  return (
    <section className="py-24 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
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
          {data.solutions.map((solution, index) => {
            const IconComponent = iconMap[solution.icon as keyof typeof iconMap] || Zap
            return (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {solution.name}
                      </h3>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-yellow-400 mr-2" />
                        <div className="flex items-center text-cyan-300">
                          <Target className="h-4 w-4 mr-2" />
                          <span className="font-semibold text-sm">{solution.outcome}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                    {solution.description}
                  </p>
                  
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <Star className="h-4 w-4 text-emerald-400 mr-2" />
                      <h4 className="text-sm font-semibold text-white">Solution Benefits:</h4>
                    </div>
                    <ul className="space-y-3">
                      {solution.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-300 text-sm font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 text-lg">
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
