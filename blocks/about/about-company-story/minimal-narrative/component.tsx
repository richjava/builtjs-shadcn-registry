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
    <section className="py-40 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl font-thin mb-16 text-gray-900 tracking-tight">{finalData.title}</h2>
            <div className="space-y-8 text-gray-600">
              {finalData.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg font-light leading-relaxed">{paragraph}</p>
              ))}
            </div>
            <div className="mt-16">
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
          <div className="bg-gray-50 rounded-none aspect-video overflow-hidden">
            {finalData.image ? (
              <img 
                src={finalData.image.url} 
                alt={finalData.image.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <div className="text-8xl mb-6 font-thin">🚀</div>
                  <p className="text-lg font-light">Company Journey Visualization</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
