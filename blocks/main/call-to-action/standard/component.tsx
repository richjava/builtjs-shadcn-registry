import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
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
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      {data.backgroundType === "image" && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.backgroundImage.url}
            alt={data.backgroundImage.alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}
      
      {data.backgroundType === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {data.title}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 font-semibold">
              {data.primaryCtaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Calendar className="mr-2 h-5 w-5" />
              {data.secondaryCtaText}
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 text-white/80">
            <p className="text-sm mb-4">No credit card required • 14-day free trial • Cancel anytime</p>
            <div className="flex justify-center items-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
