import * as fs from 'fs'
import * as path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
    const blockData = (registry.blocks || []).find((b: any) => b.name === block)
    
    if (!blockData) {
      return res.status(404).json({ error: 'Block not found in registry' })
    }

    // Construct the component path based on the block structure
    const moduleSlug = blockData.moduleName?.toLowerCase().replace(/\s+/g, '-') || ''
    const sectionSlug = blockData.sectionName?.toLowerCase().replace(/\s+/g, '-') || ''
    const templateSlug = blockData.templateName?.toLowerCase().replace(/\s+/g, '-') || ''
    const themeSlug = blockData.themeName?.toLowerCase().replace(/\s+/g, '-') || ''
    
    let componentPath: string
    
    // Handle different module structures
    if (moduleSlug === 'main' || moduleSlug === 'features') {
      // Main and Features modules: blocks/{module}/{section}/{theme}/component.tsx
      componentPath = path.join(
        process.cwd(), 
        'blocks', 
        moduleSlug,
        sectionSlug,
        themeSlug,
        'component.tsx'
      )
    } else {
      // Other modules (About, etc.): blocks/{module}/{module-section}/{theme-template}/component.tsx
      const sectionDir = `${moduleSlug}-${sectionSlug}`
      const templateDir = `${themeSlug}-${templateSlug}`
      
      componentPath = path.join(
        process.cwd(), 
        'blocks', 
        moduleSlug,
        sectionDir,
        templateDir,
        'component.tsx'
      )
    }
    
    // Read the component file
    const componentContent = fs.readFileSync(componentPath, 'utf-8')
    
    res.status(200).json({ 
      content: componentContent,
      filename: `${block}.tsx`
    })
  } catch (error) {
    console.error('Error reading component file:', error)
    res.status(404).json({ error: 'Component not found' })
  }
}
