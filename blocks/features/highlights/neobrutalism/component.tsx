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

export default function HighlightsNeobrutalism({ content }: HighlightsProps) {
  const data = content.data || {
    title: "Why Choose Our Platform",
    subtitle: "Experience the difference with our cutting-edge features designed for modern businesses.",
    ctaText: "Get Started Today",
    ctaLink: "/signup"
  }
  
  const highlights = content.collections?.featureItem || [
    {
      _id: "fallback-1",
      _type: "featureItem",
      slug: "fallback-highlight-1",
      title: "Lightning Fast Performance",
      description: "Built for speed with optimized code and modern architecture patterns that deliver exceptional performance.",
      icon: "zap",
      benefit: "10x faster than competitors",
      category: "Performance"
    },
    {
      _id: "fallback-2",
      _type: "featureItem",
      slug: "fallback-highlight-2",
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption, compliance certifications, and 24/7 monitoring.",
      icon: "shield-check",
      benefit: "SOC 2 Type II certified",
      category: "Security"
    },
    {
      _id: "fallback-3",
      _type: "featureItem",
      slug: "fallback-highlight-3",
      title: "24/7 Expert Support",
      description: "Get help when you need it with our dedicated support team available around the clock.",
      icon: "headphones",
      benefit: "Average 2min response time",
      category: "Support"
    },
    {
      _id: "fallback-4",
      _type: "featureItem",
      slug: "fallback-highlight-4",
      title: "Scalable Growth",
      description: "Grows with your business from startup to enterprise scale without compromising performance.",
      icon: "trending-up",
      benefit: "Handles 1M+ requests/day",
      category: "Scalability"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {highlights.map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon as keyof typeof iconMap] || Zap
            return (
              <div key={highlight._id} className="text-center border-4 border-black p-6 bg-white shadow-[8px_8px_0px_#000000]">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-electric-blue border-4 border-black rounded-full mb-6 shadow-[4px_4px_0px_#000000]">
                  <IconComponent className="h-8 w-8 text-black" />
                </div>
                <div className="text-sm font-bold text-black border-2 border-black px-2 py-1 bg-neon-green mb-4">
                  {highlight.category}
                </div>
                <h3 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                  {highlight.title}
                </h3>
                <p className="text-black mb-4 border-l-4 border-black pl-4">
                  {highlight.description}
                </p>
                {highlight.benefit && (
                  <div className="text-sm font-bold text-black border-2 border-black px-3 py-1 bg-yellow-300">
                    🚀 {highlight.benefit}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-electric-blue text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 text-lg px-8 py-4"
          >
            {data.ctaText}
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
