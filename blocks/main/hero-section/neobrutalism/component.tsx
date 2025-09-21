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

export default function HeroSectionNeobrutalism({ content }: HeroSectionProps) {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background */}
      {data.backgroundType === "image" && (
        <div className="absolute inset-0 z-0 border-8 border-black">
          <Image
            src={data.heroImage.url}
            alt={data.heroImage.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-black mb-6 leading-tight border-b-4 border-black pb-4">
            {data.headline}
          </h1>
          <p className="text-xl md:text-2xl text-black mb-8 max-w-3xl mx-auto leading-relaxed border-l-4 border-black pl-4">
            {data.subheadline}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-electric-blue text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
            >
              {data.primaryCtaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-black text-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200 bg-neon-green"
            >
              <Play className="mr-2 h-5 w-5" />
              {data.secondaryCtaText}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-8 h-12 border-4 border-black rounded-full flex justify-center bg-white shadow-[4px_4px_0px_#000000]">
          <div className="w-2 h-4 bg-black rounded-full mt-3 animate-bounce" />
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 right-20 bg-neon-green border-4 border-black p-4 shadow-[8px_8px_0px_#000000] transform rotate-6">
        <div className="text-4xl">🚀</div>
      </div>
      <div className="absolute bottom-20 left-20 bg-electric-blue border-4 border-black p-4 shadow-[8px_8px_0px_#000000] transform -rotate-6">
        <div className="text-4xl">💡</div>
      </div>
    </section>
  )
}
