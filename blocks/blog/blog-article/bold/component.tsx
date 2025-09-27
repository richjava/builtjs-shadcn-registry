import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, Share2, Tag, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { createPortableTextComponents } from '@/components/shared'

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
        content?: any // PortableText content
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
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro-text',
            text: 'In today\'s fast-paced development environment, building scalable React applications is crucial for long-term success. This comprehensive guide will walk you through the essential patterns and practices that will help you create maintainable, performant, and scalable React applications.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'heading1',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'heading1-text',
            text: 'Understanding Scalability in React'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'scalability-def',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'scalability-text',
            text: 'Scalability in React applications goes beyond just handling large amounts of data. It encompasses code organization, performance optimization, state management, and maintainability. A truly scalable application should be easy to understand, modify, and extend as your team and requirements grow.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'heading2',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'heading2-text',
            text: 'Key Principles for Scalable React Applications'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'principles-intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'principles-text',
            text: 'Here are the fundamental principles that will guide you in building scalable React applications:'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'list-item-1',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            _key: 'list-item-1-text',
            marks: ['strong'],
            text: 'Component Composition:'
          },
          {
            _type: 'span',
            _key: 'list-item-1-desc',
            text: ' Break down complex components into smaller, reusable pieces'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'list-item-2',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            _key: 'list-item-2-text',
            marks: ['strong'],
            text: 'State Management:'
          },
          {
            _type: 'span',
            _key: 'list-item-2-desc',
            text: ' Choose the right state management solution for your application\'s complexity'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'list-item-3',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            _key: 'list-item-3-text',
            marks: ['strong'],
            text: 'Performance Optimization:'
          },
          {
            _type: 'span',
            _key: 'list-item-3-desc',
            text: ' Implement proper memoization and lazy loading strategies'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'list-item-4',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            _key: 'list-item-4-text',
            marks: ['strong'],
            text: 'Code Organization:'
          },
          {
            _type: 'span',
            _key: 'list-item-4-desc',
            text: ' Structure your codebase in a way that scales with your team'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'heading3',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'heading3-text',
            text: 'Best Practices and Patterns'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'conclusion',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'conclusion-text',
            text: 'Implementing these patterns from the start will save you significant refactoring time as your application grows. Focus on creating a solid foundation that can support future expansion and team collaboration.'
          }
        ]
      }
    ]
  }

  return (
    <article className="relative py-16 overflow-hidden text-white md:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 bg-purple-500 rounded-full w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 bg-blue-500 rounded-full w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 bg-pink-500 rounded-full left-1/2 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative z-10 max-w-4xl px-4 mx-auto">
        {/* Article Header */}
        <header className="mb-16">
          {entry.tags && entry.tags.length > 0 && (
            <div className="mb-8">
              {entry.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 mb-3 mr-3 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  <Tag className="w-3 h-3 mr-2" />
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="mb-8 text-5xl font-extrabold leading-tight text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
            {entry.title}
          </h1>
          
          <p className="mb-12 text-xl leading-relaxed text-gray-300 md:text-2xl">
            {entry.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-8 mb-12 text-sm text-gray-300">
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
                className="w-full border border-white shadow-2xl rounded-2xl border-opacity-20"
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none prose-invert">
          <div className="text-lg leading-relaxed text-gray-200">
            {entry.content ? (
              <PortableText 
                value={entry.content} 
                components={createPortableTextComponents('bold')}
              />
            ) : (
              <p>{entry.excerpt}</p>
            )}
          </div>
        </div>

        {/* Article Footer */}
        <footer className="pt-12 mt-16 border-t border-white border-opacity-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center space-x-6">
              <span className="font-semibold text-gray-300">Share this article:</span>
              <Button 
                size="lg"
                className="font-bold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 hover:scale-105"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            {entry.publishedDate && (
              <div className="text-sm text-gray-400">
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
