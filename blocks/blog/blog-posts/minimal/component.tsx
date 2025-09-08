import { cn } from '@/lib/utils'
import { Calendar, User, ArrowRight } from 'lucide-react'

interface BlogPostsProps {
  content: {
    data?: {
      title: string
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

export default function BlogPostsMinimal({ content }: BlogPostsProps) {
  const data = content.data || {
    title: "Latest Blog Posts"
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
      readTime: "5 min read"
    },
    {
      _id: "fallback-2",
      _type: "blogItem",
      slug: "modern-web-design-trends",
      title: "Modern Web Design Trends for 2024",
      excerpt: "Discover the latest web design trends that are shaping the digital landscape and how to implement them effectively.",
      author: "Mike Chen",
      publishedDate: "2024-01-12",
      readTime: "7 min read"
    },
    {
      _id: "fallback-3",
      _type: "blogItem",
      slug: "digital-marketing-strategies",
      title: "Digital Marketing Strategies That Work",
      excerpt: "Explore proven digital marketing strategies that deliver results and help businesses grow their online presence.",
      author: "Emily Rodriguez",
      publishedDate: "2024-01-10",
      readTime: "6 min read"
    }
  ]

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          {data.title}
        </h2>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <article key={post._id || index} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {post.author && (
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  )}
                  {post.publishedDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  )}
                </div>
                
                <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
