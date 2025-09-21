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
      { name: "TechCorp", logo: "https://placehold.co/120x60/000000/FFFFFF?text=TechCorp" },
      { name: "StartupXYZ", logo: "https://placehold.co/120x60/000000/FFFFFF?text=StartupXYZ" },
      { name: "InnovateLab", logo: "https://placehold.co/120x60/000000/FFFFFF?text=InnovateLab" },
      { name: "FutureSoft", logo: "https://placehold.co/120x60/000000/FFFFFF?text=FutureSoft" }
    ]
  }

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <h2 className="pb-4 mb-6 text-4xl font-extrabold text-black border-b-4 border-black md:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-3xl pl-4 mx-auto text-xl text-black border-l-4 border-black">
            {data.subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 mb-16 md:grid-cols-4">
          {data.stats.map((stat, index) => (
            <div key={index} className="text-center border-2 border-black p-6 bg-white shadow-[4px_4px_0px_#000000]">
              <div className="mb-2 text-3xl font-extrabold md:text-4xl text-electric-blue">
                {stat.number}
              </div>
              <div className="font-bold text-black">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2">
          {data.testimonials.map((testimonial, index) => (
            <div key={index} className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_#000000]">
              <div className="flex items-center mb-4">
                <div className="flex mr-2 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-black" />
              </div>
              <p className="pl-4 mb-6 text-black border-l-4 border-black">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="mr-4 border-2 border-black rounded-full"
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
          <h3 className="pb-2 mb-8 text-2xl font-bold text-black border-b-2 border-black">
            Trusted by Leading Companies
          </h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
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
