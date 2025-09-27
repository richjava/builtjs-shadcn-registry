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

export default function CapabilitiesNeobrutalism({ content }: CapabilitiesProps) {
  const data = content.data || {
    title: "Complete Solution",
    subtitle: "Everything you need to succeed, all in one powerful platform.",
    ctaText: "Explore Capabilities",
    ctaLink: "/capabilities"
  }
  
  const capabilities = content.collections?.capabilityItem || [
    {
      _id: "fallback-1",
      _type: "capabilityItem",
      slug: "analytics-insights",
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
        "SOC 2 compliance",
        "Access controls",
        "Audit logs"
      ],
      icon: "shield"
    },
    {
      _id: "fallback-4",
      _type: "capabilityItem",
      slug: "integrations",
      category: "Integrations",
      features: [
        "API connections",
        "Third-party apps",
        "Webhook support",
        "Custom plugins"
      ],
      icon: "plug"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {capabilities.map((capability, index) => {
            const IconComponent = iconMap[capability.icon as keyof typeof iconMap] || BarChart
            return (
              <div key={capability._id || index} className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_#000000]">
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-electric-blue border-4 border-black rounded-full mr-4 shadow-[4px_4px_0px_#000000]">
                    <IconComponent className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-black border-b-2 border-black pb-1">
                    {capability.category}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {capability.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center border-2 border-black p-2 bg-green-100 shadow-[2px_2px_0px_#000000]">
                      <div className="inline-flex items-center justify-center w-6 h-6 bg-green-500 border-2 border-black rounded-full mr-3 shadow-[1px_1px_0px_#000000]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-bold text-black">{feature}</span>
                    </li>
                  ))}
                </ul>
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
