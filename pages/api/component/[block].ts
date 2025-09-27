import * as fs from 'fs'
import * as path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'
import { resolveBlockCollections } from '@/lib/collection-resolver'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { block } = req.query
  
  if (!block || typeof block !== 'string') {
    return res.status(400).json({ error: 'Block parameter is required' })
  }

  try {
    // Read the registry to find the correct component path
    const registryPath = path.join(process.cwd(), 'registry.json')
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
    
    // Find the block in the registry
    const registryBlock = (registry.blocks || []).find((b: any) => b.name === block)
    
    if (!registryBlock) {
      return res.status(404).json({ error: 'Block not found in registry' })
    }

    // Get the component path from the registry files array
    const componentFile = registryBlock.files?.find((file: string) => file.endsWith('component.tsx'))
    
    if (!componentFile) {
      return res.status(404).json({ error: 'Component file not found in registry' })
    }
    
    const componentPath = path.join(process.cwd(), componentFile)

    // Read the component file
    const componentContent = fs.readFileSync(componentPath, 'utf-8')
    
    // Resolve collections for this block
    const { collections: resolvedCollections, data: blockData } = await resolveBlockCollections(block)
    
    res.status(200).json({ 
      content: componentContent,
      filename: `${block}.tsx`,
      data: blockData, // Include block data
      collections: resolvedCollections // Include resolved collections
    })
  } catch (error) {
    console.error('Error reading component file:', error)
    res.status(404).json({ error: 'Component not found' })
  }
}
