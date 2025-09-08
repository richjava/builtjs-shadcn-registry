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
        return 'bg-green-400';
      case 'blue':
        return 'bg-blue-400';
      case 'red':
        return 'bg-red-400';
      case 'yellow':
        return 'bg-yellow-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <section className="py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-bold text-white mb-8">
              {finalData.badge}
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 text-white tracking-tight">
              {finalData.title}{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {finalData.titleHighlight}
              </span>
            </h1>
            <p className="text-2xl text-blue-100 font-medium leading-relaxed mb-8">
              {finalData.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-16 py-6 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
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
                className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white px-16 py-6 text-xl font-bold backdrop-blur-sm"
                asChild
              >
                <a href={finalData.secondaryCtaLink}>
                  <Play className="mr-3 h-6 w-6" />
                  {finalData.secondaryCtaText}
                </a>
              </Button>
            </div>
            <div className="flex items-center space-x-8 text-sm text-blue-100 font-medium">
              {finalData.trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 ${getColorClass(badge.color)} rounded-full mr-3 shadow-lg`}></div>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-3xl p-8 aspect-square overflow-hidden border-2 border-white/20 backdrop-blur-sm">
              {finalData.image ? (
                <img 
                  src={finalData.image.url} 
                  alt={finalData.image.alt}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-white">
                    <div className="text-9xl mb-6 font-black">🏢</div>
                    <p className="text-2xl font-bold">Company Image</p>
                    <p className="text-lg font-medium text-blue-100">Team photo or illustration</p>
                  </div>
                </div>
              )}
            </div>
            {/* Bold floating elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-2xl transform rotate-12">
              <div className="text-3xl font-black">🚀</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-4 shadow-2xl transform -rotate-12">
              <div className="text-3xl font-black">💡</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
