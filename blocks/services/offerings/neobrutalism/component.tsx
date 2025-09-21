import { Button } from "@/components/ui/button"
import { ArrowRight, Code, TrendingUp, Palette, Check } from "lucide-react"

interface OfferingsProps {
  content: {
    data?: {
      title: string
      subtitle: string
      ctaText: string
      ctaLink: string
    }
    collections?: {
      serviceItem?: {
        _id: string
        _type: string
        slug: string
        title: string
        description: string
        price?: string
        features?: string[]
        icon?: string
        category?: string
        ctaText?: string
        ctaLink?: string
      }[]
    }
  }
}

const iconMap = {
  code: Code,
  "trending-up": TrendingUp,
  palette: Palette
}

export default function OfferingsNeobrutalism({ content }: OfferingsProps) {
  const data = content.data || {
    title: "Our Services",
    subtitle: "Comprehensive solutions tailored to your business needs.",
    ctaText: "Get Started",
    ctaLink: "/contact"
  }
  
  const offerings = content.collections?.serviceItem || [
    {
      _id: "fallback-1",
      _type: "serviceItem",
      slug: "web-development",
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies.",
      price: "Starting at $5,000",
      features: [
        "Responsive design",
        "SEO optimization",
        "Performance optimization",
        "Content management"
      ],
      icon: "code",
      category: "Development",
      ctaText: "Learn More",
      ctaLink: "/services/web-development"
    },
    {
      _id: "fallback-2",
      _type: "serviceItem",
      slug: "digital-marketing",
      title: "Digital Marketing",
      description: "Strategic marketing campaigns to grow your online presence and reach.",
      price: "Starting at $2,500",
      features: [
        "Social media management",
        "Content creation",
        "Analytics & reporting",
        "Campaign optimization"
      ],
      icon: "trending-up",
      category: "Marketing",
      ctaText: "Learn More",
      ctaLink: "/services/digital-marketing"
    },
    {
      _id: "fallback-3",
      _type: "serviceItem",
      slug: "brand-design",
      title: "Brand Design",
      description: "Complete brand identity and visual design solutions for your business.",
      price: "Starting at $3,000",
      features: [
        "Logo design",
        "Brand guidelines",
        "Marketing materials",
        "Website design"
      ],
      icon: "palette",
      category: "Design",
      ctaText: "Learn More",
      ctaLink: "/services/brand-design"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {offerings.map((offering, index) => {
            const IconComponent = iconMap[offering.icon as keyof typeof iconMap] || Code
            return (
              <div key={offering._id} className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-electric-blue border-4 border-black rounded-full mr-4 shadow-[4px_4px_0px_#000000]">
                      <IconComponent className="h-6 w-6 text-black" />
                    </div>
                    <div className="text-sm font-bold text-black border-2 border-black px-2 py-1 bg-neon-green">
                      {offering.category}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-2">
                    {offering.title}
                  </h3>
                  
                  <p className="text-black mb-4 border-l-4 border-black pl-4">
                    {offering.description}
                  </p>
                  
                  {offering.price && (
                    <div className="text-lg font-bold text-electric-blue mb-4 border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_#000000]">
                      💰 {offering.price}
                    </div>
                  )}
                  
                  {offering.features && (
                    <ul className="space-y-2 mb-6">
                      {offering.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center border-2 border-black p-2 bg-green-100 shadow-[2px_2px_0px_#000000]">
                          <div className="inline-flex items-center justify-center w-5 h-5 bg-green-500 border-2 border-black rounded-full mr-3 shadow-[1px_1px_0px_#000000]">
                            <Check className="h-2 w-2 text-white" />
                          </div>
                          <span className="text-sm font-bold text-black">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <Button 
                    className="w-full bg-electric-blue text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
                  >
                    {offering.ctaText || "Learn More"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-neon-green text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 text-lg px-8 py-4"
          >
            {data.ctaText}
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
