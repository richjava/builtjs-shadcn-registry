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
      { name: "Company A", logo: "https://placehold.co/200x100/000000/FFFFFF?text=Company+A" },
      { name: "Company B", logo: "https://placehold.co/200x100/000000/FFFFFF?text=Company+B" },
      { name: "Company C", logo: "https://placehold.co/200x100/000000/FFFFFF?text=Company+C" },
      { name: "Company D", logo: "https://placehold.co/200x100/000000/FFFFFF?text=Company+D" }
    ]
  }

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            {data.subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 mb-20 md:grid-cols-4">
          {data.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-600 md:text-5xl">
                {stat.number}
              </div>
              <div className="font-medium text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-8 mb-20 md:grid-cols-2">
          {data.testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 rounded-lg bg-gray-50">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <Quote className="w-8 h-8 mb-4 text-blue-600" />
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="mr-4 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos */}
        <div className="text-center">
          <h3 className="mb-8 text-lg font-semibold text-gray-600">
            Trusted by leading companies
          </h3>
          <div className="grid items-center grid-cols-2 gap-8 md:grid-cols-4 opacity-60">
            {data.logos.map((logo, index) => (
              <div key={index} className="flex justify-center">
                <Image
                  src={logo.logo}
                  alt={logo.name}
                  width={120}
                  height={60}
                  className="transition-all duration-300 grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
