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

export default function BlogArticleStandard({ content }: BlogArticleProps) {
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
      <p>Scalability in React applications goes beyond just handling large amounts of data. It encompasses code organization, performance optimization, state management, and maintainability. A truly scalable application should be easy to understand, modify, and extend as your team and requirements grow.</p>
      
      <h2>Key Principles for Scalable React Applications</h2>
      <p>Here are the fundamental principles that will guide you in building scalable React applications:</p>
      
      <ul>
        <li><strong>Component Composition:</strong> Break down complex components into smaller, reusable pieces</li>
        <li><strong>State Management:</strong> Choose the right state management solution for your application's complexity</li>
        <li><strong>Performance Optimization:</strong> Implement proper memoization and lazy loading strategies</li>
        <li><strong>Code Organization:</strong> Structure your codebase in a way that scales with your team</li>
      </ul>
      
      <h2>Best Practices and Patterns</h2>
      <p>Implementing these patterns from the start will save you significant refactoring time as your application grows. Focus on creating a solid foundation that can support future expansion and team collaboration.</p>
    `
  }

  return (
    <article className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Article Header */}
        <header className="mb-12">
          {entry.tags && entry.tags.length > 0 && (
            <div className="mb-6">
              {entry.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-2 mb-2"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {entry.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {entry.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
            {entry.author && (
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{entry.author}</span>
              </div>
            )}
            {entry.publishedDate && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(entry.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            )}
            {entry.readTime && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{entry.readTime}</span>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {entry.image && (
            <div className="mb-8">
              <Image
                src={entry.image.url}
                alt={entry.image.alt || entry.title}
                width={800}
                height={400}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: entry.content || entry.excerpt }}
          />
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Share this article:</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            {entry.publishedDate && (
              <div className="text-sm text-gray-500">
                Published on {new Date(entry.publishedDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            )}
          </div>
        </footer>
      </div>
    </article>
  )
}
