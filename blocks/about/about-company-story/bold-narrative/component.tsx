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
    <section className="py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-7xl font-black mb-12 text-white tracking-tight bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {finalData.title}
            </h2>
            <div className="space-y-6 text-blue-100">
              {finalData.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-xl font-medium leading-relaxed">{paragraph}</p>
              ))}
            </div>
            <div className="mt-12">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-16 py-6 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href={finalData.ctaLink}>
                  {finalData.ctaText}
                  <ArrowRight className="ml-3 h-6 w-6" />
                </a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-3xl aspect-video overflow-hidden border-2 border-white/20 backdrop-blur-sm">
              {finalData.image ? (
                <img 
                  src={finalData.image.url} 
                  alt={finalData.image.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-white">
                    <div className="text-9xl mb-6 font-black">🚀</div>
                    <p className="text-2xl font-bold">Company Journey Visualization</p>
                  </div>
                </div>
              )}
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
