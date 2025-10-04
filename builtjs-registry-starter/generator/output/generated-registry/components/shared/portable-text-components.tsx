import React from 'react'

export function createPortableTextComponents(designSystem: string) {
  const baseClasses = {
    standard: {
      h1: 'text-3xl font-bold mb-4 text-foreground',
      h2: 'text-2xl font-semibold mb-3 text-foreground',
      h3: 'text-xl font-semibold mb-2 text-foreground',
      p: 'text-base text-muted-foreground mb-4',
      ul: 'list-disc list-inside mb-4',
      li: 'text-base text-muted-foreground mb-1',
      strong: 'font-semibold text-foreground',
      code: 'bg-muted px-2 py-1 rounded text-sm font-mono',
      blockquote: 'border-l-4 border-primary pl-4 italic text-muted-foreground'
    },
    minimal: {
      h1: 'text-4xl font-thin mb-6 text-gray-900 tracking-tight',
      h2: 'text-3xl font-light mb-4 text-gray-900 tracking-tight',
      h3: 'text-2xl font-light mb-3 text-gray-900 tracking-tight',
      p: 'text-lg text-gray-600 font-light leading-relaxed mb-6',
      ul: 'list-none mb-6',
      li: 'text-lg text-gray-600 font-light mb-2',
      strong: 'font-medium text-gray-900',
      code: 'bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800',
      blockquote: 'border-l-2 border-gray-300 pl-6 italic text-gray-600'
    },
    bold: {
      h1: 'text-4xl font-black mb-6 text-white',
      h2: 'text-3xl font-bold mb-4 text-white',
      h3: 'text-2xl font-bold mb-3 text-white',
      p: 'text-lg text-blue-100 font-medium leading-relaxed mb-6',
      ul: 'list-disc list-inside mb-6',
      li: 'text-lg text-blue-100 font-medium mb-2',
      strong: 'font-black text-white',
      code: 'bg-blue-900 px-3 py-2 rounded text-sm font-mono text-blue-100',
      blockquote: 'border-l-4 border-yellow-400 pl-6 italic text-blue-100'
    },
    neobrutalism: {
      h1: 'text-4xl font-black mb-6 text-black',
      h2: 'text-3xl font-black mb-4 text-black',
      h3: 'text-2xl font-black mb-3 text-black',
      p: 'text-lg text-black font-bold mb-6',
      ul: 'list-none mb-6',
      li: 'text-lg text-black font-bold mb-2',
      strong: 'font-black text-black',
      code: 'bg-yellow-400 px-3 py-2 border-2 border-black text-sm font-mono text-black',
      blockquote: 'border-l-4 border-black pl-6 italic text-black bg-yellow-400'
    }
  }

  const classes = baseClasses[designSystem as keyof typeof baseClasses] || baseClasses.standard

  return {
    types: {
      h1: ({ children }: any) => <h1 className={classes.h1}>{children}</h1>,
      h2: ({ children }: any) => <h2 className={classes.h2}>{children}</h2>,
      h3: ({ children }: any) => <h3 className={classes.h3}>{children}</h3>,
      p: ({ children }: any) => <p className={classes.p}>{children}</p>,
      ul: ({ children }: any) => <ul className={classes.ul}>{children}</ul>,
      li: ({ children }: any) => <li className={classes.li}>{children}</li>,
      strong: ({ children }: any) => <strong className={classes.strong}>{children}</strong>,
      code: ({ children }: any) => <code className={classes.code}>{children}</code>,
      blockquote: ({ children }: any) => <blockquote className={classes.blockquote}>{children}</blockquote>
    }
  }
}