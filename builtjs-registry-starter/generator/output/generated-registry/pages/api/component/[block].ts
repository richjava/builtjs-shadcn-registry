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
    // Read the component file
    const componentPath = path.join(process.cwd(), 'blocks', block.replace(/-/g, '/'), 'component.tsx')
    
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