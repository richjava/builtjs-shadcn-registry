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

export default function CultureNeobrutalism({ content }: CultureProps) {
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
    ctaText: "Join Our Team",
    ctaLink: "/careers"
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl text-black border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {data.values.map((value, index) => {
            const IconComponent = iconMap[value.icon as keyof typeof iconMap]
            return (
              <div
                key={index}
                className="group border-4 border-black bg-white shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 p-6"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-electric-blue text-black border-2 border-black rounded-full mb-4 shadow-[4px_4px_0px_#000000]">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-black text-lg border-b border-black pb-2 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-black font-mono">
                    {value.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button 
            asChild
            className="border-4 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 bg-electric-blue text-black font-bold text-lg px-8 py-4"
          >
            <a href={data.ctaLink}>
              {data.ctaText}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
