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

export default function ServicesNeobrutalism({ content }: ServicesProps) {
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
          "Testing & deployment"
        ]
      },
      {
        name: "Support",
        description: "Ongoing maintenance and support to keep your systems running smoothly.",
        icon: "headphones",
        duration: "24/7",
        deliverables: [
          "Technical support",
          "Bug fixes",
          "Performance monitoring",
          "Regular updates"
        ]
      }
    ],
    ctaText: "Start Your Project",
    ctaLink: "/contact"
  }

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Users
            return (
              <div key={index} className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_#000000]">
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-electric-blue border-4 border-black rounded-full mr-4 shadow-[4px_4px_0px_#000000]">
                    <IconComponent className="h-8 w-8 text-black" />
                  </div>
                  <div className="flex items-center border-2 border-black px-3 py-1 bg-neon-green">
                    <Clock className="h-4 w-4 mr-2 text-black" />
                    <span className="text-sm font-bold text-black">{service.duration}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-black mb-4 border-b-4 border-black pb-2">
                  {service.name}
                </h3>
                
                <p className="text-black mb-6 border-l-4 border-black pl-4">
                  {service.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-black mb-3 border-b-2 border-black pb-1">
                    What You Get:
                  </h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((deliverable, deliverableIndex) => (
                      <li key={deliverableIndex} className="flex items-center border-2 border-black p-2 bg-green-100 shadow-[2px_2px_0px_#000000]">
                        <div className="inline-flex items-center justify-center w-5 h-5 bg-green-500 border-2 border-black rounded-full mr-3 shadow-[1px_1px_0px_#000000]">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-sm font-bold text-black">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
