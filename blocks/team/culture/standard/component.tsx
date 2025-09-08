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
    title: "Our Culture",
    subtitle: "The values and principles that guide everything we do.",
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {data.values.map((value, index) => {
            const IconComponent = iconMap[value.icon as keyof typeof iconMap] || Lightbulb
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors duration-300">
                  <IconComponent className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
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
