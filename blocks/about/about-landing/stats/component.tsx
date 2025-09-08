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
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {finalData.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {finalData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href={finalData.ctaLink}>
                {finalData.ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg">
              Learn Our Story
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {finalData.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
