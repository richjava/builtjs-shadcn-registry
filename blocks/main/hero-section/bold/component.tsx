import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Zap } from "lucide-react"
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
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-400/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-pink-400/30 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400/30 rounded-full blur-2xl animate-pulse delay-500" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-green-400/30 rounded-full blur-2xl animate-pulse delay-700" />
      </div>

      {/* Hero Image Overlay */}
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
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span className="text-white/90 text-sm font-medium">New Platform Launch</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              {data.headline}
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-5xl mx-auto leading-relaxed font-medium">
            {data.subheadline}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-black text-xl py-6 px-10 rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-200"
            >
              {data.primaryCtaText}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-3 border-white/50 text-white hover:bg-white/10 hover:border-white font-bold text-xl py-6 px-10 rounded-2xl backdrop-blur-sm bg-white/5"
            >
              <Play className="mr-3 h-6 w-6" />
              {data.secondaryCtaText}
            </Button>
          </div>

          {/* Stats or Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-white/80">Build and deploy in record time</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Modern Tools</h3>
              <p className="text-white/80">Cutting-edge technology stack</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Easy to Use</h3>
              <p className="text-white/80">Intuitive developer experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-8 h-12 border-3 border-white/50 rounded-full flex justify-center">
          <div className="w-2 h-3 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
