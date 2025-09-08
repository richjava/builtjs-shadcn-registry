import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart, Users, Shield, Plug, Check } from "lucide-react"

interface CapabilitiesProps {
  content: {
    data?: {
      title: string
      subtitle: string
      capabilities: Array<{
        category: string
        features: string[]
        icon: string
      }>
      ctaText: string
      ctaLink: string
    }
  }
}

const iconMap = {
  "bar-chart": BarChart,
  users: Users,
  shield: Shield,
  plug: Plug
}

export default function Capabilities({ content }: CapabilitiesProps) {
  const data = content.data || {
    title: "Complete Solution",
    subtitle: "Everything you need to succeed, all in one powerful platform.",
    capabilities: [
      {
        category: "Analytics & Insights",
        features: [
          "Real-time dashboards",
          "Custom reporting",
          "Data visualization",
          "Performance metrics"
        ],
        icon: "bar-chart"
      },
      {
        category: "Collaboration Tools",
        features: [
          "Team workspaces",
          "Real-time editing",
          "Comment system",
          "Version control"
        ],
        icon: "users"
      },
      {
        category: "Security & Compliance",
        features: [
          "End-to-end encryption",
          "SSO integration",
          "Audit logs",
          "GDPR compliance"
        ],
        icon: "shield"
      },
      {
        category: "Integration & APIs",
        features: [
          "RESTful APIs",
          "Webhook support",
          "Third-party apps",
          "Custom connectors"
        ],
        icon: "plug"
      }
    ],
    ctaText: "Start Building",
    ctaLink: "/get-started"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {data.capabilities.map((capability, index) => {
            const IconComponent = iconMap[capability.icon as keyof typeof iconMap] || BarChart
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {capability.category}
                </h3>
                <ul className="space-y-3 text-left">
                  {capability.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
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
