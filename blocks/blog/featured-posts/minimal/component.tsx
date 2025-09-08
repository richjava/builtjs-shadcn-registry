import { cn } from '@/lib/utils'
import { Calendar, User, ArrowRight, Star } from 'lucide-react'

interface FeaturedPostsProps {
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

export default function FeaturedPostsMinimal({ content }: FeaturedPostsProps) {
  const data = content.data || {
    title: "Featured Posts"
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
      featured: true
    },
    {
      _id: "fallback-2",
      _type: "blogItem",
      slug: "building-scalable-react-applications",
      title: "Building Scalable React Applications",
      excerpt: "Learn the best practices for creating maintainable and scalable React applications that can grow with your business needs.",
      author: "Sarah Johnson",
      publishedDate: "2024-01-15",
      readTime: "5 min read",
      featured: false
    },
    {
      _id: "fallback-3",
      _type: "blogItem",
      slug: "modern-web-design-trends",
      title: "Modern Web Design Trends for 2024",
      excerpt: "Discover the latest web design trends that are shaping the digital landscape and how to implement them effectively.",
      author: "Mike Chen",
      publishedDate: "2024-01-12",
      readTime: "7 min read",
      featured: false
    }
  ]
  
  // Separate featured and other posts
  const featuredPost = allPosts.find(post => post.featured) || allPosts[0]
  const otherPosts = allPosts.filter(post => !post.featured || post._id !== featuredPost._id).slice(0, 2)

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center space-x-2 mb-8">
          <Star className="w-5 h-5 text-yellow-500" />
          <h2 className="text-2xl font-semibold text-gray-900">
            {data.title}
          </h2>
        </div>

        <div className="space-y-6">
          {/* Featured Post */}
          <article className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-600">Featured</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {featuredPost.author && (
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                  )}
                  {featuredPost.publishedDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredPost.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  )}
                </div>
              </div>
                
                <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors ml-4">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </article>
            
            {/* Other Posts */}
            {otherPosts.map((post, index) => (
              <article key={post._id || index} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>

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
                  </div>
                    
                    <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors ml-4">
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
