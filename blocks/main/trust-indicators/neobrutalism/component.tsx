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

export default function TrustIndicatorsNeobrutalism({ content }: TrustIndicatorsProps) {
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
        title: "Global Infrastructure",
        description: "Deployed across multiple regions with 99.9% uptime guarantee"
      },
      {
        icon: "award",
        title: "Industry Recognition",
        description: "Awarded Best Developer Platform by TechCrunch and Developer Choice Awards"
      },
      {
        icon: "users",
        title: "Expert Support Team",
        description: "24/7 support from our team of security and infrastructure experts"
      },
      {
        icon: "clock",
        title: "Rapid Response",
        description: "Average response time of under 2 minutes for critical security issues"
      }
    ]
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.indicators.map((indicator, index) => {
            const IconComponent = iconMap[indicator.icon as keyof typeof iconMap] || ShieldCheck
            return (
              <div key={index} className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_#000000]">
                <div className="flex items-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-electric-blue border-4 border-black rounded-full mr-4 shadow-[4px_4px_0px_#000000]">
                    <IconComponent className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-black border-b-2 border-black pb-1">
                    {indicator.title}
                  </h3>
                </div>
                <p className="text-black leading-relaxed border-l-4 border-black pl-4">
                  {indicator.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
