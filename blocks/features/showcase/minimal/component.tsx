import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart, Users, Shield } from "lucide-react"
import Image from "next/image"

interface ShowcaseProps {
  content: {
    data?: {
      title: string
      subtitle: string
      ctaText: string
      ctaLink: string
    }
    collections?: {
      featureItem?: {
        _id: string
        _type: string
        slug: string
        title: string
        description: string
        icon?: string
        image?: {
          url: string
          alt: string
        }
        benefit?: string
        category?: string
      }[]
    }
  }
}

const iconMap = {
  "bar-chart": BarChart,
  users: Users,
  shield: Shield
}

export default function Showcase({ content }: ShowcaseProps) {
  const data = content.data || {
    title: "Our Features",
    subtitle: "Essential tools designed for your success.",
    ctaText: "Learn More",
    ctaLink: "/features"
  }
  
  const features = content.collections?.featureItem || [
    {
      _id: "fallback-1",
      _type: "featureItem",
      slug: "fallback-feature-1",
      title: "Default Feature 1",
      description: "This is a fallback feature when no collections data is available.",
      icon: "bar-chart",
      image: {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        alt: "Default feature image"
      }
    },
    {
      _id: "fallback-2",
      _type: "featureItem",
      slug: "fallback-feature-2",
      title: "Default Feature 2",
      description: "This is another fallback feature when no collections data is available.",
      icon: "users",
      image: {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
        alt: "Default feature image"
      }
    },
    {
      _id: "fallback-3",
      _type: "featureItem",
      slug: "fallback-feature-3",
      title: "Default Feature 3",
      description: "This is a third fallback feature when no collections data is available.",
      icon: "shield",
      image: {
        url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
        alt: "Default feature image"
      }
    }
  ]

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
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || BarChart
            return (
              <div key={feature._id || index} className="group">
                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-32">
                    <Image
                      src={feature.image?.url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"}
                      alt={feature.image?.alt || feature.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute top-3 left-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <IconComponent className="h-4 w-4 text-gray-600" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
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
