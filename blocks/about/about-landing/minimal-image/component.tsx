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
    badge: "About Our Company",
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
        return 'bg-gray-400';
      case 'blue':
        return 'bg-gray-500';
      case 'red':
        return 'bg-gray-400';
      case 'yellow':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <section className="py-40 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center rounded-none border border-gray-300 px-6 py-3 text-sm font-light text-gray-600 mb-12">
              {finalData.badge}
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-thin mb-12 text-gray-900 tracking-tight">
              {finalData.title}{" "}
              <span className="text-gray-600">{finalData.titleHighlight}</span>
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed mb-12">
              {finalData.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Button 
                size="lg" 
                className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-4 text-lg font-light border-0"
                asChild
              >
                <a href={finalData.primaryCtaLink}>
                  {finalData.primaryCtaText}
                  <ArrowRight className="ml-3 h-5 w-5" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-12 py-4 text-lg font-light"
                asChild
              >
                <a href={finalData.secondaryCtaLink}>
                  <Play className="mr-3 h-5 w-5" />
                  {finalData.secondaryCtaText}
                </a>
              </Button>
            </div>
            <div className="flex items-center space-x-8 text-sm text-gray-500 font-light">
              {finalData.trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-2 h-2 ${getColorClass(badge.color)} rounded-full mr-3`}></div>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="bg-gray-50 rounded-none p-12 aspect-square overflow-hidden">
              {finalData.image ? (
                <img 
                  src={finalData.image.url} 
                  alt={finalData.image.alt}
                  className="w-full h-full object-cover rounded-none"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-400">
                    <div className="text-9xl mb-8 font-thin">🏢</div>
                    <p className="text-xl font-light">Company Image</p>
                    <p className="text-sm font-light">Team photo or illustration</p>
                  </div>
                </div>
              )}
            </div>
            {/* Minimal floating elements */}
            <div className="absolute -top-6 -right-6 bg-white border border-gray-200 rounded-none p-4 shadow-sm">
              <div className="text-3xl font-thin">🚀</div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white border border-gray-200 rounded-none p-4 shadow-sm">
              <div className="text-3xl font-thin">💡</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
