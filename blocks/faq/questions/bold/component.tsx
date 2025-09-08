'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react'

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

export default function FAQQuestionsBold({ content }: FAQQuestionsProps) {
  const { data } = content
  const [openItems, setOpenItems] = useState<number[]>([])

  if (!data) {
    return <div>No data provided for FAQ Questions Bold.</div>
  }

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
              Support Center
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {data.questions.map((item, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white hover:bg-opacity-5 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                      <HelpCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-white">
                      {item.question}
                    </span>
                  </div>
                  <div className="p-2 rounded-full bg-white bg-opacity-20">
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white" />
                    )}
                  </div>
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-8 pb-6">
                    <div className="pt-4 border-t border-white border-opacity-20">
                      <p className="text-gray-200 leading-relaxed text-lg mb-4">
                        {item.answer}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="inline-block px-3 py-1 text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <p className="text-gray-300 text-lg">{data.ctaText}</p>
            </div>
            <Button 
              size="lg" 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <a href={data.ctaLink}>Get Expert Help</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
