import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, ArrowRight, Tag, Sparkles } from 'lucide-react'
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

export default function BlogPostsBold({ content }: BlogPostsProps) {
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
        url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
        alt: "React development workspace"
      },
      tags: ["React", "JavaScript", "Development"],
      category: "Development"
    },
    {
      _id: "fallback-2",
      _type: "blogItem",
      slug: "modern-web-design-trends",
      title: "Modern Web Design Trends for 2024",
      excerpt: "Discover the latest web design trends that are shaping the digital landscape and how to implement them effectively.",
      author: "Mike Chen",
      publishedDate: "2024-01-12",
      readTime: "7 min read",
      image: {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        alt: "Modern web design interface"
      },
      tags: ["Design", "UI/UX", "Trends"],
      category: "Design"
    },
    {
      _id: "fallback-3",
      _type: "blogItem",
      slug: "digital-marketing-strategies",
      title: "Digital Marketing Strategies That Work",
      excerpt: "Explore proven digital marketing strategies that deliver results and help businesses grow their online presence.",
      author: "Emily Rodriguez",
      publishedDate: "2024-01-10",
      readTime: "6 min read",
      image: {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        alt: "Digital marketing analytics dashboard"
      },
      tags: ["Marketing", "Digital", "Strategy"],
      category: "Marketing"
    }
  ]

  return (
    <section className="relative py-16 overflow-hidden text-white md:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 bg-indigo-500 rounded-full w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 bg-purple-500 rounded-full w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 bg-pink-500 rounded-full left-1/2 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center mb-6 space-x-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-sm font-semibold tracking-wider text-yellow-400 uppercase">
              Latest Insights
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-extrabold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
            {data.title}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-300 md:text-xl">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article key={post._id || index} className="overflow-hidden transition-all duration-300 transform bg-white border border-white group bg-opacity-10 backdrop-filter backdrop-blur-lg border-opacity-20 rounded-2xl hover:bg-opacity-20 hover:scale-105">
              <div className="relative h-56">
                <Image
                  src={post.image?.url || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop"}
                  alt={post.image?.alt || post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {post.tags && post.tags.length > 0 && (
                  <div className="absolute top-4 left-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-3 py-1 mr-2 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-yellow-500 to-pink-500"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-white transition-colors line-clamp-2 group-hover:text-yellow-300">
                  {post.title}
                </h3>
                
                <p className="mb-6 text-gray-300 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mb-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    {post.author && (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-yellow-400" />
                        <span>{post.author}</span>
                      </div>
                    )}
                    {post.publishedDate && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-yellow-400" />
                        <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                    )}
                  </div>
                  {post.readTime && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span>{post.readTime}</span>
                    </div>
                  )}
                </div>

                <Button 
                  size="lg"
                  className="w-full font-bold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-yellow-500 to-pink-600 hover:from-yellow-600 hover:to-pink-700 group-hover:scale-105"
                >
                  Read Article
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button 
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg font-bold text-white bg-white border border-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-opacity-20 hover:bg-opacity-20"
          >
            Explore All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
