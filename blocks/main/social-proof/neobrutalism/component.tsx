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

export default function SocialProofNeobrutalism({ content }: SocialProofProps) {
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
      { name: "TechCorp", logo: "https://via.placeholder.com/120x60/000000/FFFFFF?text=TechCorp" },
      { name: "StartupXYZ", logo: "https://via.placeholder.com/120x60/000000/FFFFFF?text=StartupXYZ" },
      { name: "InnovateLab", logo: "https://via.placeholder.com/120x60/000000/FFFFFF?text=InnovateLab" },
      { name: "FutureSoft", logo: "https://via.placeholder.com/120x60/000000/FFFFFF?text=FutureSoft" }
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {data.stats.map((stat, index) => (
            <div key={index} className="text-center border-2 border-black p-6 bg-white shadow-[4px_4px_0px_#000000]">
              <div className="text-3xl md:text-4xl font-extrabold text-electric-blue mb-2">
                {stat.number}
              </div>
              <div className="font-bold text-black">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {data.testimonials.map((testimonial, index) => (
            <div key={index} className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_#000000]">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-500 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-black" />
              </div>
              <p className="text-black mb-6 border-l-4 border-black pl-4">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-black mr-4"
                />
                <div>
                  <div className="font-bold text-black">{testimonial.author}</div>
                  <div className="text-sm text-black">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-black mb-8 border-b-2 border-black pb-2">
            Trusted by Leading Companies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.logos.map((logo, index) => (
              <div key={index} className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_#000000]">
                <Image
                  src={logo.logo}
                  alt={logo.name}
                  width={120}
                  height={60}
                  className="mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
