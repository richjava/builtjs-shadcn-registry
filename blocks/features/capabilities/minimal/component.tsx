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
    title: "What We Offer",
    subtitle: "Essential tools and features for your success.",
    ctaText: "Get Started",
    ctaLink: "/signup"
  }
  
  const capabilities = content.collections?.capabilityItem || [
    {
      _id: "fallback-1",
      _type: "capabilityItem",
      slug: "analytics",
      category: "Analytics",
      features: [
        "Real-time dashboards",
        "Custom reporting",
        "Data visualization"
      ],
      icon: "bar-chart"
    },
    {
      _id: "fallback-2",
      _type: "capabilityItem",
      slug: "collaboration",
      category: "Collaboration",
      features: [
        "Team workspaces",
        "Real-time editing",
        "Comment system"
      ],
      icon: "users"
    },
    {
      _id: "fallback-3",
      _type: "capabilityItem",
      slug: "security",
      category: "Security",
      features: [
        "End-to-end encryption",
        "SSO integration",
        "Audit logs"
      ],
      icon: "shield"
    },
    {
      _id: "fallback-4",
      _type: "capabilityItem",
      slug: "integration",
      category: "Integration",
      features: [
        "RESTful APIs",
        "Webhook support",
        "Third-party apps"
      ],
      icon: "plug"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-semibold text-gray-900">
            {data.title}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-10 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, index) => {
            const IconComponent = iconMap[capability.icon as keyof typeof iconMap] || BarChart
            return (
              <div key={capability._id || index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-gray-100 rounded-lg">
                  <IconComponent className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">
                  {capability.category}
                </h3>
                <ul className="space-y-2 text-left">
                  {capability.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="flex-shrink-0 w-3 h-3 mr-2 text-gray-400" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            {data.ctaText}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
