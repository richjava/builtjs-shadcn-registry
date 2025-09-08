import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface AboutMissionProps {
  content: {
    data?: {
      title: string;
      mission: string;
      ctaText: string;
      ctaLink: string;
      backgroundStyle: string;
    };
  };
}

export default function AboutMission({ content }: AboutMissionProps) {
  const { data } = content;
  
  // Fallback data
  const fallbackData = {
    title: "Our Mission",
    mission: "To democratize web development by providing powerful, intuitive tools that enable anyone to build beautiful, performant applications without the traditional complexity barriers.",
    ctaText: "Join Our Mission",
    ctaLink: "/join",
    backgroundStyle: "white"
  };

  const finalData = data || fallbackData;

  const getBackgroundClass = (style: string) => {
    switch (style) {
      case 'white':
        return 'bg-white border border-gray-200';
      case 'light':
        return 'bg-gray-50 border border-gray-100';
      case 'minimal':
        return 'bg-transparent border border-gray-300';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  return (
    <section className="py-40 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${getBackgroundClass(finalData.backgroundStyle)} rounded-none p-20 text-center`}>
          <h2 className="text-5xl font-thin mb-16 text-gray-900 tracking-tight">{finalData.title}</h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-4xl mx-auto mb-16">
            {finalData.mission}
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-4 text-lg font-light border-0"
            asChild
          >
            <a href={finalData.ctaLink}>
              {finalData.ctaText}
              <ArrowRight className="ml-3 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
