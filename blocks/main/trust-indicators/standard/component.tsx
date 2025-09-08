import { ShieldCheck, Lock, Globe, Award, Users, Clock } from "lucide-react"

interface TrustIndicatorsProps {
  content: {
    data?: {
      title: string
      subtitle: string
      indicators: Array<{
        icon: string
        title: string
        description: string
      }>
    }
  }
}

const iconMap = {
  "shield-check": ShieldCheck,
  lock: Lock,
  globe: Globe,
  award: Award,
  users: Users,
  clock: Clock
}

export default function TrustIndicators({ content }: TrustIndicatorsProps) {
  const data = content.data || {
    title: "Your Security is Our Priority",
    subtitle: "We maintain the highest standards of security and compliance to protect your data and build trust.",
    indicators: [
      {
        icon: "shield-check",
        title: "SOC 2 Type II Certified",
        description: "Audited annually for security, availability, and confidentiality"
      },
      {
        icon: "lock",
        title: "End-to-End Encryption",
        description: "All data is encrypted in transit and at rest using industry-standard protocols"
      },
      {
        icon: "globe",
        title: "GDPR Compliant",
        description: "Full compliance with European data protection regulations"
      },
      {
        icon: "award",
        title: "ISO 27001 Certified",
        description: "International standard for information security management"
      },
      {
        icon: "users",
        title: "99.9% Uptime SLA",
        description: "Guaranteed service availability with financial compensation"
      },
      {
        icon: "clock",
        title: "24/7 Security Monitoring",
        description: "Round-the-clock monitoring and incident response"
      }
    ]
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.indicators.map((indicator, index) => {
            const IconComponent = iconMap[indicator.icon as keyof typeof iconMap] || ShieldCheck
            return (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <IconComponent className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {indicator.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {indicator.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Additional trust elements */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 text-gray-600">
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium">Bank-level Security</span>
            </div>
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium">256-bit SSL</span>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium">Industry Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
