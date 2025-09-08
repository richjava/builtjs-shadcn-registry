'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'

interface FAQQuestionsProps {
  content: {
    data?: {
      title: string
      subtitle: string
      questions: {
        question: string
        answer: string
        category: string
      }[]
      ctaText: string
      ctaLink: string
    }
  }
}

export default function FAQQuestionsMinimal({ content }: FAQQuestionsProps) {
  const { data } = content
  const [openItems, setOpenItems] = useState<number[]>([])

  if (!data) {
    return <div>No data provided for FAQ Questions Minimal.</div>
  }

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-2">
            {data.questions.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-md"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 text-sm">
                    {item.question}
                  </span>
                  {openItems.includes(index) ? (
                    <Minus className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-4 pb-3 border-t border-gray-100">
                    <p className="pt-3 text-gray-600 text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm mb-3">{data.ctaText}</p>
            <Button variant="outline" size="sm" asChild>
              <a href={data.ctaLink}>Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
