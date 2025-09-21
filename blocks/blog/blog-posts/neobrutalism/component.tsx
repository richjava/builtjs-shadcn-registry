import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react'
import Image from 'next/image'

interface BlogPostsProps {
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

export default function BlogPostsNeobrutalism({ content }: BlogPostsProps) {
  const data = content.data || {
    title: "Latest Blog Posts",
    subtitle: "Stay updated with our latest insights and industry news."
  }
  
  const posts = content.collections?.blogItem || [
    {
      _id: "fallback-1",
      _type: "blogItem",
      slug: "building-scalable-react-applications",
      title: "Building Scalable React Applications",
      excerpt: "Learn the best practices for creating maintainable and scalable React applications that can grow with your business needs.",
      author: "Sarah Johnson",
      publishedDate: "2024-01-15",
      readTime: "5 min read",
      image: {
        url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
        alt: "React development workspace"
      },
      tags: ["React", "JavaScript", "Development"],
      category: "Development",
      featured: true
    },
    {
      _id: "fallback-2",
      _type: "blogItem",
      slug: "modern-css-techniques",
      title: "Modern CSS Techniques for Better Performance",
      excerpt: "Discover the latest CSS features and techniques that can improve your website's performance and user experience.",
      author: "Mike Chen",
      publishedDate: "2024-01-12",
      readTime: "7 min read",
      image: {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
        alt: "CSS code on screen"
      },
      tags: ["CSS", "Performance", "Web Development"],
      category: "Design",
      featured: false
    },
    {
      _id: "fallback-3",
      _type: "blogItem",
      slug: "api-design-best-practices",
      title: "API Design Best Practices",
      excerpt: "Learn how to design RESTful APIs that are intuitive, scalable, and maintainable for your development team.",
      author: "Alex Rodriguez",
      publishedDate: "2024-01-10",
      readTime: "6 min read",
      image: {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
        alt: "API documentation"
      },
      tags: ["API", "Backend", "Development"],
      category: "Backend",
      featured: false
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post._id} className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden">
              {/* Featured Image */}
              {post.image && (
                <div className="relative h-48 border-b-4 border-black">
                  <Image
                    src={post.image.url}
                    alt={post.image.alt}
                    fill
                    className="object-cover"
                  />
                  {post.featured && (
                    <div className="absolute top-4 left-4 border-2 border-black px-3 py-1 bg-neon-green shadow-[2px_2px_0px_#000000]">
                      <span className="text-sm font-bold text-black">Featured</span>
                    </div>
                  )}
                </div>
              )}

              <div className="p-6">
                {/* Category */}
                {post.category && (
                  <div className="mb-4">
                    <div className="inline-block border-2 border-black px-3 py-1 bg-electric-blue shadow-[2px_2px_0px_#000000]">
                      <span className="text-sm font-bold text-black">{post.category}</span>
                    </div>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-black mb-4 border-l-4 border-black pl-4">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="flex items-center border-2 border-black px-2 py-1 bg-white shadow-[1px_1px_0px_#000000]">
                    <User className="h-3 w-3 mr-1 text-black" />
                    <span className="text-xs font-bold text-black">{post.author}</span>
                  </div>
                  <div className="flex items-center border-2 border-black px-2 py-1 bg-white shadow-[1px_1px_0px_#000000]">
                    <Calendar className="h-3 w-3 mr-1 text-black" />
                    <span className="text-xs font-bold text-black">{post.publishedDate}</span>
                  </div>
                  <div className="flex items-center border-2 border-black px-2 py-1 bg-white shadow-[1px_1px_0px_#000000]">
                    <Clock className="h-3 w-3 mr-1 text-black" />
                    <span className="text-xs font-bold text-black">{post.readTime}</span>
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <div key={index} className="flex items-center border-2 border-black px-2 py-1 bg-green-100 shadow-[1px_1px_0px_#000000]">
                          <Tag className="h-2 w-2 mr-1 text-black" />
                          <span className="text-xs font-bold text-black">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Read More Button */}
                <Button 
                  className="w-full bg-electric-blue text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-neon-green text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 text-lg px-8 py-4"
          >
            Load More Posts
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
