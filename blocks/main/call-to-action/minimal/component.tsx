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
    backgroundType: "white",
    backgroundImage: {
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
      alt: "Modern development workspace"
    }
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Content */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            {data.subtitle}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gray-900 text-white hover:bg-gray-800 font-medium px-8 py-3 rounded-none border-0"
            >
              {data.primaryCtaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium px-8 py-3 rounded-none"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {data.secondaryCtaText}
            </Button>
          </div>

          {/* Background Image - Subtle */}
          {data.backgroundType === "image" && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image
                src={data.backgroundImage.url}
                alt={data.backgroundImage.alt}
                fill
                className="object-cover opacity-60"
              />
            </div>
          )}

          {/* Trust indicators - Minimal */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-6">No credit card required • 14-day free trial • Cancel anytime</p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
