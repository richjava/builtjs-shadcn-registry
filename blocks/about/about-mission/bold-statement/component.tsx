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
    backgroundStyle: "gradient"
  };

  const finalData = data || fallbackData;

  const getBackgroundClass = (style: string) => {
    switch (style) {
      case 'gradient':
        return 'bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200';
      case 'accent':
        return 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200';
      case 'vibrant':
        return 'bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200';
      default:
        return 'bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200';
    }
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`${getBackgroundClass(finalData.backgroundStyle)} rounded-3xl p-16 text-center relative overflow-hidden`}>
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-20"></div>
          
          <h2 className="text-6xl font-black mb-12 text-gray-900 tracking-tight relative z-10">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {finalData.title}
            </span>
          </h2>
          <p className="text-2xl text-gray-700 font-semibold leading-relaxed max-w-4xl mx-auto mb-12 relative z-10">
            {finalData.mission}
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-16 py-6 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 relative z-10"
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
