import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

interface AboutLandingProps {
  content: {
    data?: {
      badge: string;
      title: string;
      titleHighlight: string;
      subtitle: string;
      primaryCtaText: string;
      primaryCtaLink: string;
      secondaryCtaText: string;
      secondaryCtaLink: string;
      trustBadges: Array<{
        text: string;
        color: string;
      }>;
      image: {
        url: string;
        alt: string;
      };
    };
  };
}

export default function AboutLanding({ content }: AboutLandingProps) {
  const { data } = content;
  
  // Fallback data
  const fallbackData = {
    badge: "✨ About Our Company",
    title: "We're building the future of",
    titleHighlight: "web development",
    subtitle: "Our team of passionate developers and designers work together to create tools that make web development more accessible, efficient, and enjoyable for everyone.",
    primaryCtaText: "Learn More",
    primaryCtaLink: "/about",
    secondaryCtaText: "Watch Video",
    secondaryCtaLink: "/video",
    trustBadges: [
      {
        text: "Trusted by 50K+ developers",
        color: "green"
      },
      {
        text: "Open source",
        color: "blue"
      }
    ],
    image: {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop",
      alt: "Team of developers collaborating in modern office space"
    }
  };

  const finalData = data || fallbackData;

  const getColorClass = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-500';
      case 'blue':
        return 'bg-blue-500';
      case 'red':
        return 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center border-4 border-black bg-yellow-400 px-6 py-3 text-sm font-black text-black mb-8 shadow-[4px_4px_0px_#000000]">
              {finalData.badge}
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 text-black leading-tight">
              {finalData.title}{" "}
              <span className="bg-blue-500 text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_#000000]">
                {finalData.titleHighlight}
              </span>
            </h1>
            <p className="text-2xl text-black font-bold leading-relaxed mb-8">
              {finalData.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <Button 
                size="lg"
                className="bg-blue-500 hover:bg-green-500 text-black border-4 border-black px-16 py-6 text-xl font-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
                asChild
              >
                <a href={finalData.primaryCtaLink}>
                  {finalData.primaryCtaText}
                  <ArrowRight className="ml-3 h-6 w-6" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white hover:bg-yellow-400 text-black border-4 border-black px-16 py-6 text-xl font-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
                asChild
              >
                <a href={finalData.secondaryCtaLink}>
                  <Play className="mr-3 h-6 w-6" />
                  {finalData.secondaryCtaText}
                </a>
              </Button>
            </div>
            <div className="flex items-center space-x-8 text-sm text-black font-bold">
              {finalData.trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-4 h-4 ${getColorClass(badge.color)} border-2 border-black mr-3 shadow-[2px_2px_0px_#000000]`}></div>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="bg-yellow-400 border-8 border-black p-8 aspect-square overflow-hidden shadow-[8px_8px_0px_#000000]">
              {finalData.image ? (
                <img 
                  src={finalData.image.url} 
                  alt={finalData.image.alt}
                  className="w-full h-full object-cover border-4 border-black"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-black">
                    <div className="text-9xl mb-6 font-black">🏢</div>
                    <p className="text-2xl font-black">Company Image</p>
                    <p className="text-lg font-bold">Team photo or illustration</p>
                  </div>
                </div>
              )}
            </div>
            {/* Neobrutalism floating elements */}
            <div className="absolute -top-4 -right-4 bg-red-500 border-4 border-black rounded-none p-4 shadow-[4px_4px_0px_#000000] transform rotate-12">
              <div className="text-3xl font-black">🚀</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-500 border-4 border-black rounded-none p-4 shadow-[4px_4px_0px_#000000] transform -rotate-12">
              <div className="text-3xl font-black">💡</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
