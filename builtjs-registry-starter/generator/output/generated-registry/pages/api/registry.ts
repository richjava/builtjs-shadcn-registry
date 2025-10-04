import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const registryPath = path.join(process.cwd(), 'registry.json')
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
    
    res.status(200).json(registry)
  } catch (error) {
    console.error('Error reading registry:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}