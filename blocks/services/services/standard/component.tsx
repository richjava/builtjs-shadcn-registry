import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Code, Headphones, Clock } from "lucide-react"

interface ServicesProps {
  content: {
    data?: {
      title: string
      subtitle: string
      services: Array<{
        name: string
        description: string
        icon: string
        duration: string
        deliverables: string[]
      }>
      ctaText: string
      ctaLink: string
    }
  }
}

const iconMap = {
  users: Users,
  code: Code,
  headphones: Headphones
}

export default function Services({ content }: ServicesProps) {
  const data = content.data || {
    title: "What We Do",
    subtitle: "Professional services designed to help your business thrive in the digital age.",
    services: [
      {
        name: "Consulting",
        description: "Strategic guidance to help you make informed decisions and achieve your goals.",
        icon: "users",
        duration: "Ongoing",
        deliverables: [
          "Strategic planning",
          "Market analysis",
          "Process review",
          "Implementation roadmap"
        ]
      },
      {
        name: "Development",
        description: "Custom software solutions built with the latest technologies and best practices.",
        icon: "code",
        duration: "2-12 weeks",
        deliverables: [
          "Custom applications",
          "API development",
          "Database design",
          "Quality assurance"
        ]
      },
      {
        name: "Support",
        description: "Ongoing maintenance and support to keep your systems running smoothly.",
        icon: "headphones",
        duration: "24/7",
        deliverables: [
          "Technical support",
          "System monitoring",
          "Updates & patches",
          "Performance optimization"
        ]
      }
    ],
    ctaText: "Start a Project",
    ctaLink: "/contact"
  }

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
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Users
            return (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-center mb-6">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-500">
                      {service.duration}
                    </span>
                  </div>
                  
                  <div className="text-left">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.deliverables.map((deliverable, deliverableIndex) => (
                        <li key={deliverableIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
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
