import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface AboutLandingProps {
  content: {
    data?: {
      title: string;
      subtitle: string;
      ctaText: string;
      ctaLink: string;
      stats: Array<{ number: string; label: string }>;
    };
  };
}

export default function AboutLanding({ content }: AboutLandingProps) {
  const { data } = content;
  
  // Fallback data in case no data is provided
  const fallbackData = {
    title: "Building the future of web development",
    subtitle: "We're on a mission to make modern web development more accessible, efficient, and enjoyable for developers around the world.",
    ctaText: "Join Our Team",
    ctaLink: "/join",
    stats: [
      { number: "50K+", label: "Developers" },
      { number: "50+", label: "Countries" },
      { number: "99.9%", label: "Uptime" },
      { number: "4.9/5", label: "Rating" }
    ]
  };

  const finalData = data || fallbackData;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 text-black leading-tight">
            {finalData.title}
          </h1>
          <p className="text-2xl text-black font-bold max-w-4xl mx-auto mb-12 leading-relaxed">
            {finalData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-green-500 text-black border-4 border-black px-16 py-6 text-xl font-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
              asChild
            >
              <a href={finalData.ctaLink}>
                {finalData.ctaText}
                <ArrowRight className="ml-3 h-6 w-6" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white hover:bg-yellow-400 text-black border-4 border-black px-16 py-6 text-xl font-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
            >
              Learn Our Story
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {finalData.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-yellow-400 border-4 border-black p-8 shadow-[4px_4px_0px_#000000] mb-4">
                <div className="text-4xl lg:text-5xl font-black text-black mb-2">
                  {stat.number}
                </div>
                <div className="text-black font-bold text-lg">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
