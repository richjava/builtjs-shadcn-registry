import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, Share2, Tag } from 'lucide-react'
import Image from 'next/image'

interface BlogArticleProps {
  content: {
    data?: {
      entry: {
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
        content?: string
      }
    }
  }
}

export default function BlogArticleNeobrutalism({ content }: BlogArticleProps) {
  const entry = content.data?.entry || {
    _id: "fallback-1",
    _type: "blogItem",
    slug: "building-scalable-react-applications",
    title: "Building Scalable React Applications",
    excerpt: "Learn the best practices for creating maintainable and scalable React applications that can grow with your business needs.",
    author: "Sarah Johnson",
    publishedDate: "2024-01-15",
    readTime: "5 min read",
    image: {
      url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      alt: "React development workspace"
    },
    tags: ["React", "JavaScript", "Development"],
    category: "Development",
    content: `
      <p>In today's fast-paced development environment, building scalable React applications is crucial for long-term success. This comprehensive guide will walk you through the essential patterns and practices that will help you create maintainable, performant, and scalable React applications.</p>
      
      <h2>Understanding Scalability in React</h2>
      <p>Scalability in React applications refers to the ability to handle increasing complexity, user load, and feature requirements without significant performance degradation or code maintainability issues.</p>
      
      <h2>Key Principles for Scalable React Applications</h2>
      <p>Here are the fundamental principles that will guide you in building scalable React applications:</p>
      
      <h3>1. Component Architecture</h3>
      <p>Design your components with single responsibility in mind. Each component should have a clear purpose and minimal dependencies.</p>
      
      <h3>2. State Management</h3>
      <p>Choose the right state management solution for your application's complexity. For simple apps, React's built-in state might be sufficient, while complex applications may benefit from Redux or Zustand.</p>
      
      <h3>3. Performance Optimization</h3>
      <p>Implement proper memoization, lazy loading, and code splitting to ensure your application remains performant as it scales.</p>
      
      <h2>Best Practices</h2>
      <p>Follow these best practices to ensure your React application scales effectively:</p>
      <ul>
        <li>Use TypeScript for better type safety</li>
        <li>Implement proper error boundaries</li>
        <li>Write comprehensive tests</li>
        <li>Follow consistent coding standards</li>
        <li>Document your components and APIs</li>
      </ul>
      
      <p>By following these guidelines, you'll be well on your way to building React applications that can scale with your business needs.</p>
    `
  }

  return (
    <article className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <header className="mb-12 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <div className="flex items-center mb-4">
            <div className="border-2 border-black px-3 py-1 bg-electric-blue shadow-[2px_2px_0px_#000000] mr-4">
              <span className="text-sm font-bold text-black">{entry.category}</span>
            </div>
            {entry.featured && (
              <div className="border-2 border-black px-3 py-1 bg-neon-green shadow-[2px_2px_0px_#000000]">
                <span className="text-sm font-bold text-black">Featured</span>
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {entry.title}
          </h1>
          
          <p className="text-xl text-black border-l-4 border-black pl-4 mb-6">
            {entry.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_#000000]">
              <User className="h-4 w-4 mr-2 text-black" />
              <span className="text-sm font-bold text-black">{entry.author}</span>
            </div>
            <div className="flex items-center border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_#000000]">
              <Calendar className="h-4 w-4 mr-2 text-black" />
              <span className="text-sm font-bold text-black">{entry.publishedDate}</span>
            </div>
            <div className="flex items-center border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_#000000]">
              <Clock className="h-4 w-4 mr-2 text-black" />
              <span className="text-sm font-bold text-black">{entry.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {entry.image && (
          <div className="mb-12 border-4 border-black shadow-[8px_8px_0px_#000000] overflow-hidden">
            <Image
              src={entry.image.url}
              alt={entry.image.alt}
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div 
            className="border-4 border-black p-8 bg-green-100 shadow-[8px_8px_0px_#000000]"
            dangerouslySetInnerHTML={{ __html: entry.content || '' }}
          />
        </div>

        {/* Tags */}
        {entry.tags && entry.tags.length > 0 && (
          <div className="mb-12 border-4 border-black p-6 bg-electric-blue shadow-[8px_8px_0px_#000000]">
            <h3 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag, index) => (
                <div key={index} className="flex items-center border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_#000000]">
                  <Tag className="h-3 w-3 mr-1 text-black" />
                  <span className="text-sm font-bold text-black">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share Actions */}
        <div className="border-4 border-black p-6 bg-neon-green shadow-[8px_8px_0px_#000000]">
          <h3 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
            Share This Article
          </h3>
          <div className="flex gap-4">
            <Button className="bg-white text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button className="bg-white text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200">
              Copy Link
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
