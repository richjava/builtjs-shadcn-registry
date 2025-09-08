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
  const fallbackData = {
    title: "We're building the future of web development",
    subtitle: "Join thousands of developers who are already building amazing things with our platform. Experience the power of modern web development tools.",
    ctaText: "Get Started",
    ctaLink: "/signup",
    stats: [
      { number: "50K+", label: "Developers" },
      { number: "75+", label: "Countries" },
      { number: "99.9%", label: "Uptime" },
      { number: "4.9/5", label: "Rating" }
    ]
  };
  const finalData = data || fallbackData;

  return (
    <section className="py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-7xl font-black mb-8 text-white tracking-tight leading-tight">
            {finalData.title}
          </h1>
          <p className="text-2xl text-blue-100 max-w-4xl mx-auto mb-12 font-medium leading-relaxed">
            {finalData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              asChild 
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-16 py-6 text-xl font-bold tracking-wide border-0 shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <a href={finalData.ctaLink}>
                {finalData.ctaText}
                <ArrowRight className="ml-4 h-6 w-6" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-16 py-6 text-xl font-bold tracking-wide backdrop-blur-sm"
            >
              Learn Our Story
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {finalData.stats.map((stat, index) => (
            <div key={index} className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-6xl font-black text-white mb-4 tracking-tight bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-lg text-blue-100 font-bold tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
