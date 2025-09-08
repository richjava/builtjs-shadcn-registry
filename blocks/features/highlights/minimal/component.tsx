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
    title: "Why Choose Us",
    subtitle: "Simple, powerful features that make a difference.",
    ctaText: "Get Started",
    ctaLink: "/signup"
  }
  
  const highlights = content.collections?.featureItem || [
    {
      _id: "fallback-1",
      _type: "featureItem",
      slug: "fallback-feature-1",
      title: "Fast Performance",
      description: "Optimized for speed with modern architecture.",
      icon: "zap",
      benefit: "3x faster"
    },
    {
      _id: "fallback-2",
      _type: "featureItem",
      slug: "fallback-feature-2",
      title: "Secure Platform",
      description: "Enterprise-grade security and compliance.",
      icon: "shield-check",
      benefit: "SOC 2 certified"
    },
    {
      _id: "fallback-3",
      _type: "featureItem",
      slug: "fallback-feature-3",
      title: "24/7 Support",
      description: "Round-the-clock assistance from our team.",
      icon: "headphones",
      benefit: "2min response"
    },
    {
      _id: "fallback-4",
      _type: "featureItem",
      slug: "fallback-feature-4",
      title: "Scalable Growth",
      description: "Grows with your business needs.",
      icon: "trending-up",
      benefit: "10M+ requests"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {highlights.map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon as keyof typeof iconMap] || Zap
            return (
              <div key={highlight._id || index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                  {highlight.benefit && (
                    <div className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                      {highlight.benefit}
                    </div>
                  )}
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
