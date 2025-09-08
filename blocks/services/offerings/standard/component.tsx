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

export default function Offerings({ content }: OfferingsProps) {
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
      price: "From $5,000",
      features: [
        "Responsive design",
        "SEO optimization",
        "Content management",
        "Performance optimization"
      ],
      icon: "code",
      category: "Development"
    },
    {
      _id: "fallback-2",
      _type: "serviceItem",
      slug: "digital-marketing",
      title: "Digital Marketing",
      description: "Strategic marketing campaigns to grow your online presence.",
      price: "From $2,500",
      features: [
        "Social media management",
        "Content creation",
        "Analytics tracking",
        "Campaign optimization"
      ],
      icon: "trending-up",
      category: "Marketing"
    },
    {
      _id: "fallback-3",
      _type: "serviceItem",
      slug: "brand-design",
      title: "Brand Design",
      description: "Complete brand identity and visual design solutions.",
      price: "From $3,000",
      features: [
        "Logo design",
        "Brand guidelines",
        "Marketing materials",
        "Brand strategy"
      ],
      icon: "palette",
      category: "Design"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {offerings.map((offering, index) => {
            const IconComponent = iconMap[offering.icon as keyof typeof iconMap] || Code
            return (
              <div key={offering._id || index} className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {offering.title}
                      </h3>
                      {offering.price && (
                        <p className="text-2xl font-bold text-blue-600">
                          {offering.price}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {offering.description}
                  </p>
                  
                  {offering.features && offering.features.length > 0 && (
                    <ul className="space-y-3 mb-8">
                      {offering.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    {offering.ctaText || "Learn More"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
