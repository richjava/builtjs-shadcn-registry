import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, ArrowRight, Tag, Star } from 'lucide-react'
import Image from 'next/image'

interface FeaturedPostsProps {
  content: {
    data?: {
      title: string
      subtitle: string
    }
    collections?: {
      blogItem?: {
        _id: string
        _type: string
        slug: string
        title: string
        excerpt: string
        author?: string
        publishedDate?: string
        readTime?: string
        image?: {
          url: string
          alt: string
        }
        tags?: string[]
        category?: string
        featured?: boolean
      }[]
    }
  }
}

export default function FeaturedPostsNeobrutalism({ content }: FeaturedPostsProps) {
  const data = content.data || {
    title: "Featured Posts",
    subtitle: "Discover our most popular and trending articles."
  }
  
  const allPosts = content.collections?.blogItem || [
    {
      _id: "fallback-1",
      _type: "blogItem",
      slug: "revolutionizing-digital-experiences",
      title: "Revolutionizing Digital Experiences: The Next Wave of Innovation",
      excerpt: "Explore how cutting-edge technologies are transforming the way we interact with digital platforms and creating unprecedented user experiences.",
      author: "Alex Thompson",
      publishedDate: "2024-01-20",
      readTime: "8 min read",
      image: {
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
        alt: "Digital innovation concept"
      },
      tags: ["Innovation", "Technology", "Digital"],
      category: "Technology",
      featured: true
    },
    {
      _id: "fallback-2",
      _type: "blogItem",
      slug: "future-of-web-development",
      title: "The Future of Web Development: Trends to Watch",
      excerpt: "From AI-powered development tools to edge computing, discover the trends that will shape the future of web development.",
      author: "Sarah Chen",
      publishedDate: "2024-01-18",
      readTime: "6 min read",
      image: {
        url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
        alt: "Web development workspace"
      },
      tags: ["Web Development", "Future", "Trends"],
      category: "Development",
      featured: true
    },
    {
      _id: "fallback-3",
      _type: "blogItem",
      slug: "design-systems-guide",
      title: "Building Scalable Design Systems",
      excerpt: "Learn how to create design systems that scale with your organization and improve consistency across all your products.",
      author: "Maria Rodriguez",
      publishedDate: "2024-01-15",
      readTime: "7 min read",
      image: {
        url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop",
        alt: "Design system components"
      },
      tags: ["Design Systems", "UI/UX", "Scalability"],
      category: "Design",
      featured: true
    }
  ]

  const featuredPosts = allPosts.filter(post => post.featured)
  const mainPost = featuredPosts[0]
  const sidePosts = featuredPosts.slice(1)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-black mr-3 border-2 border-black p-1 bg-white shadow-[2px_2px_0px_#000000]" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-black border-b-4 border-black pb-4">
              {data.title}
            </h2>
            <Star className="h-8 w-8 text-black ml-3 border-2 border-black p-1 bg-white shadow-[2px_2px_0px_#000000]" />
          </div>
          <p className="text-xl text-black max-w-3xl mx-auto border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Post */}
          {mainPost && (
            <div className="lg:col-span-2 border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden">
              {/* Featured Image */}
              {mainPost.image && (
                <div className="relative h-64 border-b-4 border-black">
                  <Image
                    src={mainPost.image.url}
                    alt={mainPost.image.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 border-2 border-black px-3 py-1 bg-neon-green shadow-[2px_2px_0px_#000000]">
                    <span className="text-sm font-bold text-black">Featured</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Category */}
                {mainPost.category && (
                  <div className="mb-4">
                    <div className="inline-block border-2 border-black px-3 py-1 bg-electric-blue shadow-[2px_2px_0px_#000000]">
                      <span className="text-sm font-bold text-black">{mainPost.category}</span>
                    </div>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                  {mainPost.title}
                </h3>

                {/* Excerpt */}
                <p className="text-black mb-6 border-l-4 border-black pl-4 text-lg">
                  {mainPost.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_#000000]">
                    <User className="h-4 w-4 mr-2 text-black" />
                    <span className="text-sm font-bold text-black">{mainPost.author}</span>
                  </div>
                  <div className="flex items-center border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_#000000]">
                    <Calendar className="h-4 w-4 mr-2 text-black" />
                    <span className="text-sm font-bold text-black">{mainPost.publishedDate}</span>
                  </div>
                  <div className="flex items-center border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_#000000]">
                    <Clock className="h-4 w-4 mr-2 text-black" />
                    <span className="text-sm font-bold text-black">{mainPost.readTime}</span>
                  </div>
                </div>

                {/* Tags */}
                {mainPost.tags && mainPost.tags.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {mainPost.tags.map((tag, index) => (
                        <div key={index} className="flex items-center border-2 border-black px-2 py-1 bg-green-100 shadow-[1px_1px_0px_#000000]">
                          <Tag className="h-3 w-3 mr-1 text-black" />
                          <span className="text-xs font-bold text-black">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Read More Button */}
                <Button 
                  size="lg"
                  className="bg-electric-blue text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Side Featured Posts */}
          <div className="space-y-6">
            {sidePosts.map((post) => (
              <article key={post._id} className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden">
                {/* Featured Image */}
                {post.image && (
                  <div className="relative h-32 border-b-4 border-black">
                    <Image
                      src={post.image.url}
                      alt={post.image.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 border-2 border-black px-2 py-1 bg-neon-green shadow-[1px_1px_0px_#000000]">
                      <span className="text-xs font-bold text-black">Featured</span>
                    </div>
                  </div>
                )}

                <div className="p-4">
                  {/* Category */}
                  {post.category && (
                    <div className="mb-2">
                      <div className="inline-block border-2 border-black px-2 py-1 bg-electric-blue shadow-[1px_1px_0px_#000000]">
                        <span className="text-xs font-bold text-black">{post.category}</span>
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <h4 className="text-lg font-bold text-black mb-2 border-b-2 border-black pb-1">
                    {post.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-black mb-3 border-l-4 border-black pl-3 text-sm">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="flex items-center border-2 border-black px-2 py-1 bg-white shadow-[1px_1px_0px_#000000]">
                      <User className="h-3 w-3 mr-1 text-black" />
                      <span className="text-xs font-bold text-black">{post.author}</span>
                    </div>
                    <div className="flex items-center border-2 border-black px-2 py-1 bg-white shadow-[1px_1px_0px_#000000]">
                      <Clock className="h-3 w-3 mr-1 text-black" />
                      <span className="text-xs font-bold text-black">{post.readTime}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Button 
                    className="w-full bg-electric-blue text-black border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] transition-all duration-200 text-sm"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-neon-green text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 text-lg px-8 py-4"
          >
            View All Featured Posts
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
