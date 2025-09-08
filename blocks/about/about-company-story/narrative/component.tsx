import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface AboutCompanyStoryProps {
  content: {
    data?: {
      title: string;
      paragraphs: string[];
      ctaText: string;
      ctaLink: string;
      image: {
        url: string;
        alt: string;
      };
    };
  };
}

export default function AboutCompanyStory({ content }: AboutCompanyStoryProps) {
  const { data } = content;
  
  // Fallback data
  const fallbackData = {
    title: "Our Story",
    paragraphs: [
      "Founded in 2020, we started as a small team of developers frustrated by the complexity of modern web development. We believed there had to be a better way to build beautiful, performant applications without sacrificing developer experience.",
      "What began as a weekend project has grown into a platform trusted by thousands of developers worldwide. Our tools have powered everything from startup MVPs to enterprise applications, helping teams ship faster and more confidently.",
      "Today, we continue to push the boundaries of what's possible in web development, always keeping our core mission in mind: making great technology accessible to everyone."
    ],
    ctaText: "Read More",
    ctaLink: "/about/story",
    image: {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      alt: "Team collaboration and innovation workspace"
    }
  };

  const finalData = data || fallbackData;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">{finalData.title}</h2>
            <div className="space-y-4 text-muted-foreground">
              {finalData.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild>
                <a href={finalData.ctaLink}>
                  {finalData.ctaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="bg-muted rounded-lg aspect-video overflow-hidden">
            {finalData.image ? (
              <img 
                src={finalData.image.url} 
                alt={finalData.image.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <div className="text-6xl mb-4">🚀</div>
                  <p>Company Journey Visualization</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
