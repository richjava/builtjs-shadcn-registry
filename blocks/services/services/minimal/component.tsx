import { Button } from "@/components/ui/button"
import { ArrowRight, Code, TrendingUp, Palette, Clock, CheckCircle } from "lucide-react"

interface ServicesProps {
  content: {
    data?: {
      title: string
      subtitle: string
      services: Array<{
        name: string
        description: string
        duration: string
        deliverables: string[]
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

export default function Services({ content }: ServicesProps) {
  const data = content.data || {
    title: "Our Services",
    subtitle: "Professional solutions tailored to your needs.",
    services: [
      {
        name: "Web Development",
        description: "Custom websites and web applications built with modern technologies.",
        duration: "2-4 weeks",
        deliverables: [
          "Responsive website",
          "Content management system",
          "SEO optimization"
        ],
        icon: "code"
      },
      {
        name: "Digital Marketing",
        description: "Strategic marketing campaigns to boost your online presence.",
        duration: "1-2 weeks",
        deliverables: [
          "Marketing strategy",
          "Content calendar",
          "Analytics setup"
        ],
        icon: "trending-up"
      },
      {
        name: "Brand Design",
        description: "Complete brand identity and visual design solutions.",
        duration: "3-5 weeks",
        deliverables: [
          "Logo design",
          "Brand guidelines",
          "Marketing materials"
        ],
        icon: "palette"
      }
    ],
    ctaText: "Get Started",
    ctaLink: "/contact"
  }

  return (
    <section className="py-16 bg-gray-50">
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
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code
            return (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-sm transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                    <IconComponent className="h-4 w-4 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {service.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center mb-4 text-sm text-gray-500">
                  <Clock className="h-3 w-3 mr-2" />
                  <span>{service.duration}</span>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Deliverables:</h4>
                  <ul className="space-y-1">
                    {service.deliverables.map((deliverable, deliverableIndex) => (
                      <li key={deliverableIndex} className="flex items-center text-xs">
                        <CheckCircle className="h-3 w-3 text-gray-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Learn More
                  <ArrowRight className="ml-1 h-3 w-3" />
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
