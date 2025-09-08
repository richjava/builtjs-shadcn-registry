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
    <section className="py-40 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-32">
          <h1 className="text-6xl font-thin mb-12 text-gray-900 tracking-tight leading-tight">
            {finalData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-16 font-light leading-relaxed">
            {finalData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              asChild 
              className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-4 text-lg font-light tracking-wide border-0"
            >
              <a href={finalData.ctaLink}>
                {finalData.ctaText}
                <ArrowRight className="ml-3 h-5 w-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-12 py-4 text-lg font-light tracking-wide"
            >
              Learn Our Story
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 max-w-4xl mx-auto">
          {finalData.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-thin text-gray-900 mb-3 tracking-tight">{stat.number}</div>
              <div className="text-sm text-gray-500 font-light tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
