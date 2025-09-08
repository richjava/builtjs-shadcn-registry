import { Button } from "@/components/ui/button"
import { ArrowRight, Code, TrendingUp, Palette, Check } from "lucide-react"

interface OfferingsProps {
  content: {
    data?: {
      title: string
      subtitle: string
      offerings: Array<{
        name: string
        description: string
        price: string
        features: string[]
        icon: string
      }>
      ctaText: string
      ctaLink: string
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
    title: "Service Packages",
    subtitle: "Choose the right package for your business needs.",
    offerings: [
      {
        name: "Web Development",
        description: "Custom websites and applications built with modern technologies.",
        price: "From $5,000",
        features: [
          "Responsive design",
          "SEO optimization",
          "Content management"
        ],
        icon: "code"
      },
      {
        name: "Digital Marketing",
        description: "Strategic marketing campaigns to grow your online presence.",
        price: "From $2,500",
        features: [
          "Social media management",
          "Content creation",
          "Analytics tracking"
        ],
        icon: "trending-up"
      },
      {
        name: "Brand Design",
        description: "Complete brand identity and visual design solutions.",
        price: "From $3,000",
        features: [
          "Logo design",
          "Brand guidelines",
          "Marketing materials"
        ],
        icon: "palette"
      }
    ],
    ctaText: "Get Quote",
    ctaLink: "/quote"
  }

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
          {data.offerings.map((offering, index) => {
            const IconComponent = iconMap[offering.icon as keyof typeof iconMap] || Code
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <IconComponent className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {offering.name}
                    </h3>
                    <p className="text-lg font-semibold text-gray-700">
                      {offering.price}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {offering.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {offering.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="h-3 w-3 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
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
