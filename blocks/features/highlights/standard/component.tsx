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
    title: "Why Choose Our Platform",
    subtitle: "Experience the difference with our cutting-edge features designed for modern businesses.",
    ctaText: "Get Started Today",
    ctaLink: "/signup"
  }
  
  const highlights = content.collections?.featureItem || []

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {highlights.map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon as keyof typeof iconMap] || Zap
            return (
              <div key={highlight._id || index} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {highlight.description}
                    </p>
                    {highlight.benefit && (
                      <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        {highlight.benefit}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
