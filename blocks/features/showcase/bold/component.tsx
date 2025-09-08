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
    title: "Revolutionary Features",
    subtitle: "Discover the cutting-edge capabilities that transform how you work and achieve extraordinary results.",
    ctaText: "Explore All Features",
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
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
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
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
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
        url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
        alt: "Default feature image"
      }
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-emerald-100 max-w-4xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || BarChart
            return (
              <div key={feature._id || index} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="relative h-64">
                    <Image
                      src={feature.image?.url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"}
                      alt={feature.image?.alt || feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-emerald-100 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
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
