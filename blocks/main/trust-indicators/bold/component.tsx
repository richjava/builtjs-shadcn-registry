import { ShieldCheck, Lock, Globe, Award, Users, Clock, Sparkles } from "lucide-react"

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

const indicatorColors = [
  "from-green-400 to-emerald-500",
  "from-blue-400 to-cyan-500",
  "from-purple-400 to-pink-500",
  "from-orange-400 to-red-500",
  "from-indigo-400 to-blue-500",
  "from-yellow-400 to-orange-500"
]

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
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full px-6 py-2 mb-8">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Trust & Security</span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.indicators.map((indicator, index) => {
            const IconComponent = iconMap[indicator.icon as keyof typeof iconMap] || ShieldCheck
            const colorClass = indicatorColors[index % indicatorColors.length]
            return (
              <div key={index} className="group text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${colorClass} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {indicator.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {indicator.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Additional trust elements */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">Bank-level Security</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                <Lock className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">256-bit SSL</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                <Award className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">Industry Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
