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
    backgroundStyle: "muted"
  };

  const finalData = data || fallbackData;

  const getBackgroundClass = (style: string) => {
    switch (style) {
      case 'muted':
        return 'bg-yellow-400';
      case 'primary':
        return 'bg-blue-500';
      case 'secondary':
        return 'bg-green-500';
      case 'accent':
        return 'bg-red-500';
      default:
        return 'bg-yellow-400';
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className={`${getBackgroundClass(finalData.backgroundStyle)} border-8 border-black p-16 text-center shadow-[8px_8px_0px_#000000]`}>
          <h2 className="text-6xl font-black mb-8 text-black border-4 border-black bg-white px-8 py-6 shadow-[4px_4px_0px_#000000]">
            {finalData.title}
          </h2>
          <p className="text-2xl text-black font-bold max-w-4xl mx-auto mb-12 leading-relaxed">
            {finalData.mission}
          </p>
          <Button 
            size="lg" 
            className="bg-red-500 hover:bg-blue-500 text-black border-4 border-black px-16 py-6 text-xl font-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
            asChild
          >
            <a href={finalData.ctaLink}>
              {finalData.ctaText}
              <ArrowRight className="ml-3 h-6 w-6" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
