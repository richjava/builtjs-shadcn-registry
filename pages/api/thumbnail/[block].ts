import type { NextApiRequest, NextApiResponse } from 'next'
import { resolveBlockCollections } from '@/lib/collection-resolver'
import * as fs from 'fs'
import * as path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { block } = req.query
  
  if (!block || typeof block !== 'string') {
    return res.status(400).json({ error: 'Block parameter is required' })
  }

  try {
    // Resolve collections and data for this block
    const { collections: resolvedCollections, data: blockData } = await resolveBlockCollections(block)
    
    // Read the registry to get block info
    const registryPath = path.join(process.cwd(), 'registry.json')
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
    const blockInfo = registry.blocks.find((b: any) => b.name === block)
    
    if (!blockInfo) {
      return res.status(404).json({ error: 'Block not found' })
    }

    // Get the component path
    const componentFile = blockInfo.files?.find((file: string) => file.endsWith('component.tsx'))
    if (!componentFile) {
      return res.status(404).json({ error: 'Component file not found' })
    }
    
    const componentPath = path.join(process.cwd(), componentFile)
    const componentContent = fs.readFileSync(componentPath, 'utf-8')
    
    // Extract the component name from the file
    const componentNameMatch = componentContent.match(/export default function (\w+)/)
    const componentName = componentNameMatch ? componentNameMatch[1] : 'Component'
    
    // Create a simple HTML page with the component
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${block} Thumbnail</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              font-family: system-ui, -apple-system, sans-serif;
            }
            .thumbnail-container {
              transform: scale(0.5);
              transform-origin: top left;
              width: 200%;
              height: 200%;
              overflow: hidden;
            }
          </style>
        </head>
        <body>
          <div class="thumbnail-container">
            <div class="p-8 bg-gray-50 min-h-screen">
              <div class="bg-white rounded-lg shadow-sm border p-6">
                <h2 class="text-xl font-bold mb-4 text-gray-800">${blockInfo.templateName || 'Template'}</h2>
                <div class="space-y-4">
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div class="mt-6 flex gap-2">
                  <div class="h-8 bg-blue-500 rounded px-4 flex items-center text-white text-sm font-medium">
                    Primary Action
                  </div>
                  <div class="h-8 bg-gray-200 rounded px-4 flex items-center text-gray-700 text-sm font-medium">
                    Secondary
                  </div>
                </div>
                <div class="mt-4 text-xs text-gray-500">
                  ${blockInfo.themeName || 'Theme'} • ${blockInfo.moduleName || 'Module'}
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)
  } catch (error) {
    console.error('Error generating thumbnail:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
