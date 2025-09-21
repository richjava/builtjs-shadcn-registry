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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 text-black border-4 border-black bg-blue-500 text-white px-6 py-4 shadow-[4px_4px_0px_#000000]">
              {finalData.title}
            </h2>
            <div className="space-y-6 text-black">
              {finalData.paragraphs.map((paragraph, index) => (
                <div key={index} className="bg-yellow-400 border-4 border-black p-6 shadow-[4px_4px_0px_#000000]">
                  <p className="text-lg font-bold leading-relaxed">{paragraph}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button 
                className="bg-green-500 hover:bg-red-500 text-black border-4 border-black px-12 py-4 text-xl font-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
                asChild
              >
                <a href={finalData.ctaLink}>
                  {finalData.ctaText}
                  <ArrowRight className="ml-3 h-6 w-6" />
                </a>
              </Button>
            </div>
          </div>
          <div className="bg-red-500 border-8 border-black aspect-video overflow-hidden shadow-[8px_8px_0px_#000000]">
            {finalData.image ? (
              <img 
                src={finalData.image.url} 
                alt={finalData.image.alt}
                className="w-full h-full object-cover border-4 border-black"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-black">
                  <div className="text-8xl mb-6 font-black">🚀</div>
                  <p className="text-2xl font-black">Company Journey Visualization</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
