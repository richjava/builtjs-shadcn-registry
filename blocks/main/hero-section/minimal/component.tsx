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
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Background Image with subtle overlay */}
      {data.backgroundType === "image" && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.heroImage.url}
            alt={data.heroImage.alt}
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
            {data.headline}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            {data.subheadline}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gray-900 text-white hover:bg-gray-800 font-medium text-lg py-4 px-8 rounded-none border-0"
            >
              {data.primaryCtaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-medium text-lg py-4 px-8 rounded-none"
            >
              <Play className="mr-2 h-4 w-4" />
              {data.secondaryCtaText}
            </Button>
          </div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-px h-16 bg-gray-300">
          <div className="w-1 h-1 bg-gray-900 rounded-full mx-auto mt-4 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
