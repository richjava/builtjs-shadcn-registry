import { cn } from '@/lib/utils'
import { Calendar, User } from 'lucide-react'

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

export default function BlogArticleMinimal({ content }: BlogArticleProps) {
  const entry = content.data?.entry || {
    _id: "fallback-1",
    _type: "blogItem",
    slug: "building-scalable-react-applications",
    title: "Building Scalable React Applications!",
    excerpt: "Learn the best practices for creating maintainable and scalable React applications that can grow with your business needs.",
    author: "Sarah Johnson",
    publishedDate: "2024-01-15",
    readTime: "5 min read",
    content: `
      <p>In today's fast-paced development environment, building scalable React applications is crucial for long-term success. This comprehensive guide will walk you through the essential patterns and practices that will help you create maintainable, performant, and scalable React applications.</p>
      
      <h2>Understanding Scalability in React</h2>
      <p>Scalability in React applications goes beyond just handling large amounts of data. It encompasses code organization, performance optimization, state management, and maintainability.</p>
      
      <h2>Key Principles for Scalable React Applications</h2>
      <p>Here are the fundamental principles that will guide you in building scalable React applications:</p>
      
      <ul>
        <li><strong>Component Composition:</strong> Break down complex components into smaller, reusable pieces</li>
        <li><strong>State Management:</strong> Choose the right state management solution for your application's complexity</li>
        <li><strong>Performance Optimization:</strong> Implement proper memoization and lazy loading strategies</li>
        <li><strong>Code Organization:</strong> Structure your codebase in a way that scales with your team</li>
      </ul>
    `
  }

  return (
    <article className="py-8 bg-white md:py-12">
      <div className="container max-w-3xl px-4 mx-auto">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="mb-4 text-2xl font-semibold text-gray-900 md:text-3xl">
            {entry.title}
          </h1>
          
          <div className="flex items-center mb-6 space-x-4 text-sm text-gray-500">
            {entry.author && (
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{entry.author}</span>
              </div>
            )}
            {entry.publishedDate && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(entry.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose max-w-none">
          <div 
            className="leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{ __html: entry.content || entry.excerpt }}
          />
        </div>
      </div>
    </article>
  )
}
