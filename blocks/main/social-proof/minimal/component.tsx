import Image from "next/image"
import { Star, Quote } from "lucide-react"

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
      { name: "Company A", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop" },
      { name: "Company B", logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=100&fit=crop" },
      { name: "Company C", logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=100&fit=crop" },
      { name: "Company D", logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=100&fit=crop" }
    ]
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            {data.subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          {data.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-light text-gray-900 mb-2 tracking-tight">
                {stat.number}
              </div>
              <div className="text-gray-600 font-light text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {data.testimonials.map((testimonial, index) => (
            <div key={index} className="border-0 border-b border-gray-200 pb-12">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gray-400 fill-current" />
                ))}
              </div>
              <Quote className="h-6 w-6 text-gray-400 mb-6" />
              <p className="text-gray-700 text-lg mb-8 leading-relaxed font-light">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={40}
                  height={40}
                  className="rounded-full mr-4"
                />
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos */}
        <div className="text-center">
          <h3 className="text-sm font-light text-gray-500 mb-12 tracking-wider uppercase">
            Trusted by leading companies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-40">
            {data.logos.map((logo, index) => (
              <div key={index} className="flex justify-center">
                <Image
                  src={logo.logo}
                  alt={logo.name}
                  width={100}
                  height={50}
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
