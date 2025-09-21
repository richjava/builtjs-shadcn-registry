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

export default function CallToActionNeobrutalism({ content }: CallToActionProps) {
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
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Background */}
      {data.backgroundType === "image" && (
        <div className="absolute inset-0 z-0 border-8 border-black">
          <Image
            src={data.backgroundImage.url}
            alt={data.backgroundImage.alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto border-4 border-black p-12 bg-yellow-300 shadow-[12px_12px_0px_#000000]">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-6 leading-tight border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl md:text-2xl text-black mb-8 max-w-3xl mx-auto leading-relaxed border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-electric-blue text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 text-lg px-8 py-4"
            >
              {data.primaryCtaText}
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-black text-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 bg-neon-green text-lg px-8 py-4"
            >
              <Calendar className="mr-2 h-6 w-6" />
              {data.secondaryCtaText}
            </Button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 right-10 bg-neon-green border-4 border-black p-4 shadow-[8px_8px_0px_#000000] transform rotate-6">
        <div className="text-4xl">🚀</div>
      </div>
      <div className="absolute bottom-10 left-10 bg-electric-blue border-4 border-black p-4 shadow-[8px_8px_0px_#000000] transform -rotate-6">
        <div className="text-4xl">⚡</div>
      </div>
    </section>
  )
}
