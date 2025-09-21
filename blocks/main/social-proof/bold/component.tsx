import Image from "next/image"
import { Star, Quote, Sparkles, TrendingUp, Users, Globe, Clock } from "lucide-react"

interface SocialProofProps {
  content: {
    data?: {
      title: string
      subtitle: string
      stats: Array<{
        number: string
        label: string
      }>
      testimonials: Array<{
        quote: string
        author: string
        role: string
        avatar: string
      }>
      logos: Array<{
        name: string
        logo: string
      }>
    }
  }
}

const statIcons = {
  "Active Users": Users,
  "Uptime": TrendingUp,
  "Countries": Globe,
  "Support": Clock
}

export default function SocialProof({ content }: SocialProofProps) {
  const data = content.data || {
    title: "Trusted by Industry Leaders",
    subtitle: "Join thousands of companies who trust our platform to power their success.",
    stats: [
      { number: "10,000+", label: "Active Users" },
      { number: "99.9%", label: "Uptime" },
      { number: "50+", label: "Countries" },
      { number: "24/7", label: "Support" }
    ],
    testimonials: [
      {
        quote: "This platform has revolutionized how we build and deploy applications. The developer experience is unmatched.",
        author: "Sarah Chen",
        role: "CTO, TechCorp",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      },
      {
        quote: "The performance improvements we've seen since switching have been incredible. Our users love the speed.",
        author: "Michael Rodriguez",
        role: "Lead Developer, StartupXYZ",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      }
    ],
    logos: [
      { name: "Company A", logo: "https://placehold.co/200x100/000000/FFFFFF?text=Company+A" },
      { name: "Company B", logo: "https://placehold.co/200x100/000000/FFFFFF?text=Company+B" },
      { name: "Company C", logo: "https://placehold.co/200x100/000000/FFFFFF?text=Company+C" },
      { name: "Company D", logo: "https://placehold.co/200x100/000000/FFFFFF?text=Company+D" }
    ]
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-400/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-6 py-2 mb-8">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Social Proof</span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            {data.subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {data.stats.map((stat, index) => {
            const IconComponent = statIcons[stat.label as keyof typeof statIcons] || TrendingUp
            return (
              <div key={index} className="group text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-bold text-sm">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {data.testimonials.map((testimonial, index) => (
            <div key={index} className="group p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <Quote className="h-6 w-6 text-white" />
              </div>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed font-medium">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full mr-4 ring-2 ring-purple-200"
                />
                <div>
                  <div className="font-bold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full px-6 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-bold text-gray-700">Trusted by leading companies</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {data.logos.map((logo, index) => (
              <div key={index} className="group flex justify-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/80 transition-all duration-300">
                <Image
                  src={logo.logo}
                  alt={logo.name}
                  width={120}
                  height={60}
                  className="grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
