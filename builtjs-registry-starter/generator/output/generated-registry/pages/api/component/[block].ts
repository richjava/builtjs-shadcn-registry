import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { block } = req.query

  if (!block || typeof block !== 'string') {
    return res.status(400).json({ message: 'Block name is required' })
  }

  try {
    // Map block name to actual file path
    // Block names like "main-home-landing-cover1-skeleton" should map to 
    // "blocks/main/home-landing/cover1-skeleton/component.tsx"
    const blockParts = block.split('-')
    let moduleName = blockParts[0]
    let sectionName = blockParts.slice(1, -2).join('-') // Everything except last 2 parts
    let templateDesignSystem = blockParts.slice(-2).join('-') // Last 2 parts
    
    const componentPath = path.join(process.cwd(), 'blocks', moduleName, sectionName, templateDesignSystem, 'component.tsx')
    
    if (!fs.existsSync(componentPath)) {
      return res.status(404).json({ message: 'Component not found' })
    }

    const content = fs.readFileSync(componentPath, 'utf-8')
    
    res.status(200).json({ content })
  } catch (error) {
    console.error('Error reading component:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}