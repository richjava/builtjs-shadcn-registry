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
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium mb-6">
              {finalData.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {finalData.title}{" "}
              <span className="text-primary">{finalData.titleHighlight}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {finalData.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" asChild>
                <a href={finalData.primaryCtaLink}>
                  {finalData.primaryCtaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={finalData.secondaryCtaLink}>
                  <Play className="mr-2 h-4 w-4" />
                  {finalData.secondaryCtaText}
                </a>
              </Button>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              {finalData.trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-2 h-2 ${getColorClass(badge.color)} rounded-full mr-2`}></div>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 aspect-square overflow-hidden">
              {finalData.image ? (
                <img 
                  src={finalData.image.url} 
                  alt={finalData.image.alt}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-8xl mb-6">🏢</div>
                    <p className="text-lg font-medium">Company Image</p>
                    <p className="text-sm text-muted-foreground">Team photo or illustration</p>
                  </div>
                </div>
              )}
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-background border rounded-lg p-3 shadow-lg">
              <div className="text-2xl">🚀</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-background border rounded-lg p-3 shadow-lg">
              <div className="text-2xl">💡</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}