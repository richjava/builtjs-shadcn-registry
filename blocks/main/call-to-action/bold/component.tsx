import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Sparkles } from "lucide-react"
import Image from "next/image"

interface CallToActionProps {
  content: {
    data?: {
      title: string
      subtitle: string
      primaryCtaText: string
      primaryCtaLink: string
      secondaryCtaText: string
      secondaryCtaLink: string
      backgroundType: string
      backgroundImage: {
        url: string
        alt: string
      }
    }
  }
}

export default function CallToAction({ content }: CallToActionProps) {
  const data = content.data || {
    title: "Ready to Get Started?",
    subtitle: "Join thousands of developers who are already building the future with our platform.",
    primaryCtaText: "Start Free Trial",
    primaryCtaLink: "/signup",
    secondaryCtaText: "Schedule Demo",
    secondaryCtaLink: "/demo",
    backgroundType: "gradient",
    backgroundImage: {
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
      alt: "Modern development workspace"
    }
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      {data.backgroundType === "image" && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.backgroundImage.url}
            alt={data.backgroundImage.alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-orange-900/80" />
        </div>
      )}
      
      {data.backgroundType === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span className="text-white/90 text-sm font-medium">Limited Time Offer</span>
          </div>

          {/* Main Content */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            {data.subtitle}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 font-bold text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-200"
            >
              {data.primaryCtaText}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-bold text-lg px-10 py-4 rounded-full backdrop-blur-sm"
            >
              <Calendar className="mr-3 h-6 w-6" />
              {data.secondaryCtaText}
            </Button>
          </div>

          {/* Trust indicators - Bold */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <p className="text-white/80 text-lg mb-6 font-medium">✨ No credit card required • 14-day free trial • Cancel anytime</p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/90">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="font-semibold">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-200" />
                <span className="font-semibold">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-500" />
                <span className="font-semibold">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
