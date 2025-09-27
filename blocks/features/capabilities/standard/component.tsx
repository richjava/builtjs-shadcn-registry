import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart, Users, Shield, Plug, Check } from "lucide-react"

interface CapabilitiesProps {
  content: {
    data?: {
      title: string
      subtitle: string
      ctaText: string
      ctaLink: string
    }
    collections?: {
      capabilityItem?: {
        _id: string
        _type: string
        slug: string
        category: string
        features: string[]
        icon?: string
        description?: string
      }[]
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
    ctaText: "Start Building",
    ctaLink: "/get-started"
  }
  
  const capabilities = content.collections?.capabilityItem || [
    {
      _id: "fallback-1",
      _type: "capabilityItem",
      slug: "analytics-insights",
      category: "Analytics & Insights",
      features: [
        "Real-time dashboards!!!",
        "Custom reporting",
        "Data visualization",
        "Performance metrics"
      ],
      icon: "bar-chart"
    },
    {
      _id: "fallback-2",
      _type: "capabilityItem",
      slug: "collaboration-tools",
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
      _id: "fallback-3",
      _type: "capabilityItem",
      slug: "security-compliance",
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
      _id: "fallback-4",
      _type: "capabilityItem",
      slug: "integration-apis",
      category: "Integration & APIs",
      features: [
        "RESTful APIs",
        "Webhook support",
        "Third-party apps",
        "Custom connectors"
      ],
      icon: "plug"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, index) => {
            const IconComponent = iconMap[capability.icon as keyof typeof iconMap] || BarChart
            return (
              <div key={capability._id || index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="mb-6 text-xl font-semibold text-gray-900">
                  {capability.category}
                </h3>
                <ul className="space-y-3 text-left">
                  {capability.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="flex-shrink-0 w-4 h-4 mr-3 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
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
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
