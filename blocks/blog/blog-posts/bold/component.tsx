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
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
              Latest Insights
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={post._id || index} className="group bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-2xl overflow-hidden hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
              <div className="relative h-56">
                <Image
                  src={post.image?.url || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop"}
                  alt={post.image?.alt || post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {post.tags && post.tags.length > 0 && (
                  <div className="absolute top-4 left-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500 to-pink-500 text-white mr-2"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-300 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
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
                  className="w-full bg-gradient-to-r from-yellow-500 to-pink-600 hover:from-yellow-600 hover:to-pink-700 text-white font-bold shadow-lg transition-all duration-300 transform group-hover:scale-105"
                >
                  Read Article
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            variant="outline"
            size="lg"
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 text-white hover:bg-opacity-20 font-bold text-lg px-8 py-4"
          >
            Explore All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
