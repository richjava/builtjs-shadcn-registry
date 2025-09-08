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

export default function FeaturedPostsStandard({ content }: FeaturedPostsProps) {
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
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
        alt: "Digital innovation concept"
      },
      tags: ["Innovation", "Technology", "Digital"],
      category: "Technology",
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
      image: {
        url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
        alt: "React development workspace"
      },
      tags: ["React", "JavaScript", "Development"],
      category: "Development",
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
      image: {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        alt: "Modern web design interface"
      },
      tags: ["Design", "UI/UX", "Trends"],
      category: "Design",
      featured: false
    }
  ]
  
  // Separate featured and other posts
  const featuredPost = allPosts.find(post => post.featured) || allPosts[0]
  const otherPosts = allPosts.filter(post => !post.featured || post._id !== featuredPost._id).slice(0, 2)

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wider">
              Featured
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <article className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={featuredPost.image?.url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"}
                    alt={featuredPost.image?.alt || featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500 text-white">
                      <Star className="w-4 h-4 mr-1" />
                      Featured
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <div className="mb-4">
                    {featuredPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-4">
                    {featuredPost.author && (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                    )}
                    {featuredPost.publishedDate && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                    )}
                  </div>
                  {featuredPost.readTime && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  )}
                </div>

                <Button size="lg" className="w-full md:w-auto">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </article>
        </div>

        {/* Other Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherPosts.map((post, index) => (
            <article key={post._id || index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={post.image?.url || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop"}
                  alt={post.image?.alt || post.title}
                  fill
                  className="object-cover"
                />
                {post.tags && post.tags.length > 0 && (
                  <div className="absolute top-4 left-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white bg-opacity-90 text-gray-800 mr-2"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
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
                  {post.readTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  )}
                </div>

                <Button className="w-full group">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
