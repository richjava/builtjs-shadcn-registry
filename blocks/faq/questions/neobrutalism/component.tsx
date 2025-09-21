'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

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

export default function FAQQuestionsNeobrutalism({ content }: FAQQuestionsProps) {
  const { data } = content
  const [openItems, setOpenItems] = useState<number[]>([])

  if (!data) {
    return <div>No data provided for FAQ Questions Neobrutalism.</div>
  }

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          {data.questions.map((item, index) => {
            const isOpen = openItems.includes(index)
            return (
              <div key={index} className="mb-4 border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left border-b-4 border-black bg-electric-blue hover:bg-blue-400 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 bg-white border-4 border-black rounded-full mr-4 shadow-[2px_2px_0px_#000000]">
                        <HelpCircle className="h-4 w-4 text-black" />
                      </div>
                      <h3 className="text-lg font-bold text-black border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_#000000]">
                        {item.category}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-black mr-3 border-2 border-black px-2 py-1 bg-neon-green shadow-[1px_1px_0px_#000000]">
                        Q{index + 1}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-6 w-6 text-black border-2 border-black p-1 bg-white shadow-[1px_1px_0px_#000000]" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-black border-2 border-black p-1 bg-white shadow-[1px_1px_0px_#000000]" />
                      )}
                    </div>
                  </div>
                  <p className="text-lg font-bold text-black mt-4 border-l-4 border-black pl-4">
                    {item.question}
                  </p>
                </button>
                
                {isOpen && (
                  <div className="p-6 bg-green-100 border-t-4 border-black">
                    <div className="flex items-start">
                      <div className="inline-flex items-center justify-center w-6 h-6 bg-green-500 border-2 border-black rounded-full mr-3 mt-1 shadow-[1px_1px_0px_#000000]">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <p className="text-black border-2 border-black p-4 bg-white shadow-[2px_2px_0px_#000000]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-neon-green text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 text-lg px-8 py-4"
          >
            {data.ctaText}
          </Button>
        </div>
      </div>
    </section>
  )
}
