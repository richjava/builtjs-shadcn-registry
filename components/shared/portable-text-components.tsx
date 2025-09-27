import { PortableTextComponents } from '@portabletext/react'
import { cn } from '@/lib/utils'

// Base styles that apply to all themes
const baseStyles = {
  h1: "text-3xl font-bold mb-6",
  h2: "text-2xl font-semibold mb-4 mt-8",
  h3: "text-xl font-medium mb-3 mt-6",
  h4: "text-lg font-medium mb-2 mt-4",
  p: "mb-4 leading-relaxed",
  ul: "mb-4 pl-6",
  ol: "mb-4 pl-6",
  li: "mb-2",
  blockquote: "border-l-4 pl-4 italic my-6",
  code: "bg-gray-100 px-2 py-1 rounded text-sm font-mono",
  pre: "bg-gray-100 p-4 rounded-lg overflow-x-auto my-6",
  a: "text-blue-600 hover:text-blue-800 underline",
  strong: "font-semibold",
  em: "italic"
}

// Theme-specific style variations
const themeStyles = {
  standard: {
    h1: "text-gray-900",
    h2: "text-gray-800", 
    h3: "text-gray-700",
    h4: "text-gray-600",
    p: "text-gray-700",
    ul: "text-gray-700",
    ol: "text-gray-700",
    li: "text-gray-700",
    blockquote: "border-gray-300 text-gray-600",
    code: "bg-gray-100 text-gray-800",
    pre: "bg-gray-100 text-gray-800",
    a: "text-blue-600 hover:text-blue-800",
    strong: "text-gray-900",
    em: "text-gray-600"
  },
  minimal: {
    h1: "text-gray-900 font-light",
    h2: "text-gray-800 font-light",
    h3: "text-gray-700 font-light", 
    h4: "text-gray-600 font-light",
    p: "text-gray-600 font-light",
    ul: "text-gray-600 font-light",
    ol: "text-gray-600 font-light",
    li: "text-gray-600 font-light",
    blockquote: "border-gray-200 text-gray-500 font-light",
    code: "bg-gray-50 text-gray-700 font-mono",
    pre: "bg-gray-50 text-gray-700 font-mono",
    a: "text-gray-700 hover:text-gray-900",
    strong: "text-gray-900 font-normal",
    em: "text-gray-500"
  },
  bold: {
    h1: "text-white font-black",
    h2: "text-gray-100 font-bold",
    h3: "text-gray-200 font-bold",
    h4: "text-gray-300 font-bold", 
    p: "text-gray-200 font-medium",
    ul: "text-gray-200 font-medium",
    ol: "text-gray-200 font-medium",
    li: "text-gray-200 font-medium",
    blockquote: "border-blue-400 text-gray-300 font-medium",
    code: "bg-blue-900 text-blue-100 font-bold",
    pre: "bg-blue-900 text-blue-100 font-bold",
    a: "text-blue-300 hover:text-blue-100 font-semibold",
    strong: "text-white font-black",
    em: "text-gray-300 font-medium"
  },
  neobrutalism: {
    h1: "text-black font-black border-2 border-black p-2 bg-yellow-300 shadow-[4px_4px_0px_#000000]",
    h2: "text-black font-bold border-2 border-black p-2 bg-green-300 shadow-[3px_3px_0px_#000000]",
    h3: "text-black font-bold border-2 border-black p-1 bg-pink-300 shadow-[2px_2px_0px_#000000]",
    h4: "text-black font-bold border border-black p-1 bg-blue-300 shadow-[1px_1px_0px_#000000]",
    p: "text-black font-bold",
    ul: "text-black font-bold",
    ol: "text-black font-bold", 
    li: "text-black font-bold",
    blockquote: "border-4 border-black p-4 bg-purple-300 shadow-[4px_4px_0px_#000000] font-bold",
    code: "bg-red-300 border-2 border-black px-2 py-1 font-black",
    pre: "bg-red-300 border-2 border-black p-4 font-black",
    a: "text-black font-black underline decoration-4",
    strong: "text-black font-black",
    em: "text-black font-bold italic"
  }
}

export function createPortableTextComponents(theme: 'standard' | 'minimal' | 'bold' | 'neobrutalism'): PortableTextComponents {
  const themeStyle = themeStyles[theme]
  
  return {
    block: {
      h1: ({ children }) => (
        <h1 className={cn(baseStyles.h1, themeStyle.h1)}>
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className={cn(baseStyles.h2, themeStyle.h2)}>
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className={cn(baseStyles.h3, themeStyle.h3)}>
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className={cn(baseStyles.h4, themeStyle.h4)}>
          {children}
        </h4>
      ),
      normal: ({ children }) => (
        <p className={cn(baseStyles.p, themeStyle.p)}>
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className={cn(baseStyles.blockquote, themeStyle.blockquote)}>
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className={cn(baseStyles.ul, themeStyle.ul)}>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className={cn(baseStyles.ol, themeStyle.ol)}>
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className={cn(baseStyles.li, themeStyle.li)}>
          {children}
        </li>
      ),
      number: ({ children }) => (
        <li className={cn(baseStyles.li, themeStyle.li)}>
          {children}
        </li>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className={cn(baseStyles.strong, themeStyle.strong)}>
          {children}
        </strong>
      ),
      em: ({ children }) => (
        <em className={cn(baseStyles.em, themeStyle.em)}>
          {children}
        </em>
      ),
      code: ({ children }) => (
        <code className={cn(baseStyles.code, themeStyle.code)}>
          {children}
        </code>
      ),
      link: ({ children, value }) => (
        <a 
          href={value?.href} 
          className={cn(baseStyles.a, themeStyle.a)}
          target={value?.blank ? '_blank' : undefined}
          rel={value?.blank ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      ),
    },
    types: {
      code: ({ value }) => (
        <pre className={cn(baseStyles.pre, themeStyle.pre)}>
          <code>{value?.code}</code>
        </pre>
      ),
    },
  }
}
