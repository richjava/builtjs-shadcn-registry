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
        return 'bg-muted';
      case 'primary':
        return 'bg-primary text-primary-foreground';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      case 'accent':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted';
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${getBackgroundClass(finalData.backgroundStyle)} rounded-2xl p-12 text-center`}>
          <h2 className="text-3xl font-bold mb-6">{finalData.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {finalData.mission}
          </p>
          <Button size="lg" asChild>
            <a href={finalData.ctaLink}>
              {finalData.ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
