import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart, Users, Shield } from "lucide-react"
import Image from "next/image"

interface ShowcaseProps {
  content: {
    data?: {
      title: string
      subtitle: string
      ctaText: string
      ctaLink: string
    }
    collections?: {
      featureItem?: {
        _id: string
        _type: string
        slug: string
        title: string
        description: string
        icon?: string
        image?: {
          url: string
          alt: string
        }
        benefit?: string
        category?: string
      }[]
    }
  }
}

const iconMap = {
  "bar-chart": BarChart,
  users: Users,
  shield: Shield
}

export default function ShowcaseNeobrutalism({ content }: ShowcaseProps) {
  const data = content.data || {
    title: "Powerful Features",
    subtitle: "Discover the capabilities that make our platform the perfect choice for your business.",
    ctaText: "Explore All Features",
    ctaLink: "/features"
  }
  
  const features = content.collections?.featureItem || [
    {
      _id: "fallback-1",
      _type: "featureItem",
      slug: "fallback-feature-1",
      title: "Advanced Analytics",
      description: "Get deep insights into your application performance with our comprehensive analytics dashboard.",
      icon: "bar-chart",
      image: {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        alt: "Analytics dashboard"
      },
      benefit: "Make data-driven decisions",
      category: "Analytics"
    },
    {
      _id: "fallback-2",
      _type: "featureItem",
      slug: "fallback-feature-2",
      title: "Team Collaboration",
      description: "Work seamlessly with your team using our built-in collaboration tools and real-time editing.",
      icon: "users",
      image: {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
        alt: "Team collaboration"
      },
      benefit: "Boost team productivity",
      category: "Collaboration"
    },
    {
      _id: "fallback-3",
      _type: "featureItem",
      slug: "fallback-feature-3",
      title: "Enterprise Security",
      description: "Protect your data with enterprise-grade security features and compliance certifications.",
      icon: "shield",
      image: {
        url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
        alt: "Security features"
      },
      benefit: "Keep your data safe",
      category: "Security"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || BarChart
            return (
              <div key={feature._id} className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden">
                <div className="relative h-48 border-b-4 border-black">
                  {feature.image ? (
                    <Image
                      src={feature.image.url}
                      alt={feature.image.alt}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      <IconComponent className="h-16 w-16 text-black" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-electric-blue border-2 border-black rounded-full mr-4 shadow-[2px_2px_0px_#000000]">
                      <IconComponent className="h-5 w-5 text-black" />
                    </div>
                    <div className="text-sm font-bold text-black border-2 border-black px-2 py-1 bg-neon-green">
                      {feature.category}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-2">
                    {feature.title}
                  </h3>
                  <p className="text-black mb-4 border-l-4 border-black pl-4">
                    {feature.description}
                  </p>
                  {feature.benefit && (
                    <div className="text-sm font-bold text-black border-2 border-black px-3 py-1 bg-yellow-300">
                      💡 {feature.benefit}
                    </div>
                  )}
                </div>
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
