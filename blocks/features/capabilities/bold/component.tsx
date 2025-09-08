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
    title: "Complete Platform",
    subtitle: "Everything you need to build, scale, and succeed in one powerful ecosystem.",
    ctaText: "Start Building Today",
    ctaLink: "/get-started"
  }
  
  const capabilities = content.collections?.capabilityItem || [
    {
      _id: "fallback-1",
      _type: "capabilityItem",
      slug: "advanced-analytics",
      category: "Advanced Analytics",
      features: [
        "Real-time dashboards",
        "Custom reporting",
        "Data visualization",
        "Performance metrics"
      ],
      icon: "bar-chart"
    },
    {
      _id: "fallback-2",
      _type: "capabilityItem",
      slug: "team-collaboration",
      category: "Team Collaboration",
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
      slug: "enterprise-security",
      category: "Enterprise Security",
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
      slug: "api-integrations",
      category: "API & Integrations",
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
    <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {capabilities.map((capability, index) => {
            const IconComponent = iconMap[capability.icon as keyof typeof iconMap] || BarChart
            return (
              <div key={capability._id || index} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 group-hover:bg-white/30 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-6">
                      {capability.category}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {capability.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-blue-100 text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-4 text-lg">
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
