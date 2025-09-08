import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb, Users, Award, TrendingUp, Star, Sparkles } from "lucide-react"

interface CultureProps {
  content: {
    data?: {
      title: string
      subtitle: string
      values: Array<{
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
  lightbulb: Lightbulb,
  users: Users,
  award: Award,
  "trending-up": TrendingUp
}

export default function Culture({ content }: CultureProps) {
  const data = content.data || {
    title: "Our Culture & Values",
    subtitle: "The fundamental principles and beliefs that shape our company culture, drive our decisions, and create an environment where our team thrives and delivers exceptional results.",
    values: [
      {
        title: "Innovation First",
        description: "We embrace cutting-edge technologies, creative problem-solving, and forward-thinking approaches to stay ahead of industry trends and deliver breakthrough solutions.",
        icon: "lightbulb"
      },
      {
        title: "Collaborative Excellence",
        description: "We foster an environment of open communication, mutual respect, and shared success where diverse perspectives come together to achieve extraordinary outcomes.",
        icon: "users"
      },
      {
        title: "Uncompromising Quality",
        description: "We maintain the highest standards in everything we do, from code quality to client relationships, ensuring excellence is not just a goal but our standard practice.",
        icon: "award"
      },
      {
        title: "Continuous Growth",
        description: "We invest heavily in our people's development, encourage lifelong learning, and create opportunities for personal and professional advancement at every level.",
        icon: "trending-up"
      }
    ],
    ctaText: "Join Our Culture",
    ctaLink: "/careers"
  }

  return (
    <section className="py-24 bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 relative overflow-hidden">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {data.values.map((value, index) => {
            const IconComponent = iconMap[value.icon as keyof typeof iconMap] || Lightbulb
            return (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-400 mr-2" />
                        <h3 className="text-2xl font-bold text-white">
                          {value.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {value.description}
                  </p>
                  
                  <div className="mt-6 flex items-center">
                    <Sparkles className="h-4 w-4 text-violet-400 mr-2" />
                    <span className="text-violet-300 text-sm font-medium">Core Value</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-semibold px-8 py-4 text-lg">
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
