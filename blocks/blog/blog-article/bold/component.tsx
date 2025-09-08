import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, Share2, Tag, ArrowRight } from 'lucide-react'
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

export default function BlogArticleBold({ content }: BlogArticleProps) {
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
    <article className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Article Header */}
        <header className="mb-16">
          {entry.tags && entry.tags.length > 0 && (
            <div className="mb-8">
              {entry.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white mr-3 mb-3"
                >
                  <Tag className="w-3 h-3 mr-2" />
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400 leading-tight">
            {entry.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            {entry.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-8 text-sm text-gray-300 mb-12">
            {entry.author && (
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">{entry.author}</span>
              </div>
            )}
            {entry.publishedDate && (
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <span>{new Date(entry.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            )}
            {entry.readTime && (
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>{entry.readTime}</span>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {entry.image && (
            <div className="mb-12">
              <Image
                src={entry.image.url}
                alt={entry.image.alt || entry.title}
                width={800}
                height={400}
                className="rounded-2xl shadow-2xl w-full border border-white border-opacity-20"
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none prose-invert">
          <div 
            className="text-gray-200 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: entry.content || entry.excerpt }}
          />
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-12 border-t border-white border-opacity-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <span className="text-gray-300 font-semibold">Share this article:</span>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            {entry.publishedDate && (
              <div className="text-gray-400 text-sm">
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
