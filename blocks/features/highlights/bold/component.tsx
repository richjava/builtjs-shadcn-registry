import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, ShieldCheck, Headphones, TrendingUp } from "lucide-react"

interface HighlightsProps {
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
  zap: Zap,
  "shield-check": ShieldCheck,
  headphones: Headphones,
  "trending-up": TrendingUp
}

export default function Highlights({ content }: HighlightsProps) {
  const data = content.data || {
    title: "Why We're Different",
    subtitle: "Experience the power of innovation with our cutting-edge platform designed for modern success.",
    ctaText: "Start Your Journey",
    ctaLink: "/get-started"
  }
  
  const highlights = content.collections?.featureItem || [
    {
      _id: "fallback-1",
      _type: "featureItem",
      slug: "fallback-feature-1",
      title: "Lightning Fast Performance",
      description: "Built for speed with optimized code and modern architecture patterns that deliver results.",
      icon: "zap",
      benefit: "3x faster loading times"
    },
    {
      _id: "fallback-2",
      _type: "featureItem",
      slug: "fallback-feature-2",
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption and industry-leading compliance standards.",
      icon: "shield-check",
      benefit: "SOC 2 Type II certified"
    },
    {
      _id: "fallback-3",
      _type: "featureItem",
      slug: "fallback-feature-3",
      title: "24/7 Expert Support",
      description: "Round-the-clock assistance from our dedicated team of industry experts.",
      icon: "headphones",
      benefit: "Average 2min response time"
    },
    {
      _id: "fallback-4",
      _type: "featureItem",
      slug: "fallback-feature-4",
      title: "Infinite Scalability",
      description: "Grows with your business from startup to enterprise scale without limits.",
      icon: "trending-up",
      benefit: "Handles 10M+ requests/day"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {highlights.map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon as keyof typeof iconMap] || Zap
            return (
              <div key={highlight._id || index} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {highlight.title}
                      </h3>
                      <p className="text-purple-100 mb-4 leading-relaxed">
                        {highlight.description}
                      </p>
                      {highlight.benefit && (
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold rounded-full">
                          {highlight.benefit}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-4 text-lg">
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
