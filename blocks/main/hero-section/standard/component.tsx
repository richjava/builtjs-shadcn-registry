import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"

interface HeroSectionProps {
  content: {
    data?: {
      headline: string
      subheadline: string
      primaryCtaText: string
      primaryCtaLink: string
      secondaryCtaText: string
      secondaryCtaLink: string
      heroImage: {
        url: string
        alt: string
      }
      backgroundType: string
    }
  }
}

export default function HeroSection({ content }: HeroSectionProps) {
  const data = content.data || {
    headline: "Build the Future of Web Development",
    subheadline: "Create stunning, performant applications with our comprehensive toolkit designed for modern developers and teams.",
    primaryCtaText: "Get Started",
    primaryCtaLink: "/get-started",
    secondaryCtaText: "View Demo",
    secondaryCtaLink: "/demo",
    heroImage: {
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
      alt: "Modern web development workspace"
    },
    backgroundType: "image"
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      {data.backgroundType === "image" && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.heroImage.url}
            alt={data.heroImage.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {data.headline}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            {data.subheadline}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              {data.primaryCtaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Play className="mr-2 h-5 w-5" />
              {data.secondaryCtaText}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
