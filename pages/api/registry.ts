import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const registryPath = path.join(process.cwd(), 'public', 'registry.json')
    const registryContent = fs.readFileSync(registryPath, 'utf-8')
    const registry = JSON.parse(registryContent)
    
    res.status(200).json(registry)
  } catch (error) {
    console.error('Error reading registry.json:', error)
    res.status(500).json({ error: 'Failed to load registry data' })
  }
}
