import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb, Users, Award, TrendingUp } from "lucide-react"

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
    title: "Our Values",
    subtitle: "The principles that guide our work and relationships.",
    values: [
      {
        title: "Innovation",
        description: "We embrace new ideas and technologies to solve complex problems.",
        icon: "lightbulb"
      },
      {
        title: "Collaboration",
        description: "We believe in the power of teamwork and open communication.",
        icon: "users"
      },
      {
        title: "Excellence",
        description: "We strive for the highest quality in everything we deliver.",
        icon: "award"
      },
      {
        title: "Growth",
        description: "We invest in our people and encourage continuous learning.",
        icon: "trending-up"
      }
    ],
    ctaText: "Learn More",
    ctaLink: "/culture"
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {data.values.map((value, index) => {
            const IconComponent = iconMap[value.icon as keyof typeof iconMap] || Lightbulb
            return (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-200 transition-colors duration-200">
                  <IconComponent className="h-6 w-6 text-gray-600" />
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button variant="outline" size="sm">
            {data.ctaText}
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    </section>
  )
}
