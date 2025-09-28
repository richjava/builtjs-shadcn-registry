/**
 * Collection Resolver Utility
 * 
 * This utility resolves collection references from the new architecture:
 * - For static generation: reads files directly from filesystem
 * - For client-side: fetches from public URLs
 * - Returns data in the format expected by Built.js components
 */

import * as fs from 'fs'
import * as path from 'path'

interface CollectionReference {
  [collectionName: string]: {
    limit?: number
    config?: {
      limit?: number
    }
  }
}

interface RegistryCollections {
  [collectionName: string]: any[]
}

/**
 * Loads collections data - works in both server and client environments
 */
async function loadCollectionsData(): Promise<RegistryCollections> {
  // Check if we're in a server environment (Node.js)
  if (typeof window === 'undefined') {
    try {
      // Server-side: read from filesystem
      const collectionsPath = path.join(process.cwd(), 'public', 'registry-data', 'collections-data.json')
      const collectionsContent = fs.readFileSync(collectionsPath, 'utf-8')
      return JSON.parse(collectionsContent)
    } catch (error) {
      console.error('Error loading collections data from filesystem:', error)
      return {}
    }
  } else {
    try {
      // Client-side: fetch from public URL
      const response = await fetch('/registry-data/collections-data.json')
      if (!response.ok) {
        throw new Error(`Failed to load collections data: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error loading collections data from fetch:', error)
      return {}
    }
  }
}

/**
 * Loads block definition - works in both server and client environments
 */
async function loadBlockDefinition(blockName: string): Promise<any> {
  // Check if we're in a server environment (Node.js)
  if (typeof window === 'undefined') {
    try {
      // Server-side: read from filesystem
      const blocksPath = path.join(process.cwd(), 'public', 'registry-data', 'blocks-index.json')
      const blocksContent = fs.readFileSync(blocksPath, 'utf-8')
      const blocksIndex = JSON.parse(blocksContent)
      return blocksIndex[blockName] || {}
    } catch (error) {
      console.error('Error loading block definition from filesystem:', error)
      return {}
    }
  } else {
    try {
      // Client-side: fetch from public URL
      const response = await fetch('/registry-data/blocks-index.json')
      if (!response.ok) {
        throw new Error(`Failed to load blocks index: ${response.status}`)
      }
      const blocksIndex = await response.json()
      return blocksIndex[blockName] || {}
    } catch (error) {
      console.error('Error loading block definition from fetch:', error)
      return {}
    }
  }
}

/**
 * Resolves entry references from collection data
 * 
 * @param entryRef - Entry reference object (new format: { contentType: "blogItem", slug: "post-slug" } or old format: { blogItem: { slug: "post-slug" } })
 * @param collectionsData - Available collections data
 * @returns Resolved entry object or null if not found
 */
function resolveEntryReference(entryRef: any, collectionsData: RegistryCollections): any {
  if (!entryRef || typeof entryRef !== 'object') {
    return null
  }

  let collectionType: string
  let slug: string

  // Check if it's the new format: { contentType: "blogItem", slug: "post-slug" }
  if (entryRef.contentType && entryRef.slug) {
    collectionType = entryRef.contentType
    slug = entryRef.slug
  }
  // Check if it's the old format: { blogItem: { slug: "post-slug" } }
  else {
    const [firstKey] = Object.keys(entryRef)
    const config = entryRef[firstKey]
    
    if (!firstKey || !config?.slug) {
      console.warn(`⚠️  Invalid entry reference format:`, entryRef)
      return null
    }
    
    collectionType = firstKey
    slug = config.slug
  }

  if (!collectionsData[collectionType]) {
    console.warn(`⚠️  Collection type '${collectionType}' not found for entry resolution`)
    return null
  }

  const collection = collectionsData[collectionType]
  
  // If no slug provided, return the first item
  if (!slug) {
    return collection[0] || null
  }

  // Find entry by slug
  const entry = collection.find((item: any) => item.slug === slug)
  
  if (!entry) {
    console.warn(`⚠️  Entry with slug '${slug}' not found in collection '${collectionType}'`)
    return null
  }

  return entry
}

/**
 * Resolves collections for a block using the new architecture
 * 
 * @param blockName - The name of the block to resolve collections for
 * @returns Object containing both resolved collections and block data
 */
export async function resolveBlockCollections(blockName: string): Promise<{
  collections: Record<string, any[]>
  data: any
}> {
  const resolvedCollections: Record<string, any[]> = {}
  let blockData: any = {}

  try {
    // Load collections data and block definition in parallel
    const [collectionsData, blockDefinition] = await Promise.all([
      loadCollectionsData(),
      loadBlockDefinition(blockName)
    ])


    // Extract block data
    blockData = { ...(blockDefinition.data || {}) }

    // Resolve entry references in block data
    if (blockData.entry && typeof blockData.entry === 'object') {
      const resolvedEntry = resolveEntryReference(blockData.entry, collectionsData)
      if (resolvedEntry) {
        blockData.entry = resolvedEntry
        console.log(`✅ Resolved entry reference for block: ${blockName}`)
      }
    }

    const blockCollections = blockDefinition.collections || {}

    // Resolve each collection reference
    Object.entries(blockCollections).forEach(([collectionName, config]: [string, any]) => {
      const collectionData = collectionsData[collectionName]
      
      if (collectionData && Array.isArray(collectionData)) {
        // Handle new config object format: { config: { limit: 3 } }
        // or legacy format: { limit: 3 }
        const limit = config.config?.limit || config.limit
        const resolvedData = limit ? collectionData.slice(0, limit) : collectionData
        
        resolvedCollections[collectionName] = resolvedData
        
        console.log(`✅ Resolved ${collectionName}: ${resolvedData.length} items${limit ? ` (limited to ${limit})` : ''}`)
      } else {
        console.warn(`⚠️  Collection '${collectionName}' not found in collections data`)
      }
    })

  } catch (error) {
    console.error('Error resolving block collections:', error)
  }

  return {
    collections: resolvedCollections,
    data: blockData
  }
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use resolveBlockCollections instead
 */
export function resolveCollectionsForBlock(
  blockCollections: CollectionReference | undefined,
  registryCollections: RegistryCollections | undefined
): Record<string, any[]> {
  const resolvedCollections: Record<string, any[]> = {}

  if (!blockCollections || !registryCollections) {
    console.warn('Missing collections data for block resolution')
    return resolvedCollections
  }

  // Resolve each collection reference
  Object.entries(blockCollections).forEach(([collectionName, config]) => {
    const collectionData = registryCollections[collectionName]
    
    if (collectionData && Array.isArray(collectionData)) {
      // Handle new config object format: { config: { limit: 3 } }
      // or legacy format: { limit: 3 }
      const limit = config.config?.limit || config.limit
      const resolvedData = limit ? collectionData.slice(0, limit) : collectionData
      
      resolvedCollections[collectionName] = resolvedData
      
      console.log(`✅ Resolved ${collectionName}: ${resolvedData.length} items${limit ? ` (limited to ${limit})` : ''}`)
    } else {
      console.warn(`⚠️  Collection '${collectionName}' not found in registry collections`)
    }
  })

  return resolvedCollections
}

/**
 * Debug utility to log collection resolution details
 * 
 * @param blockName - Name of the block being resolved
 * @param resolvedCollections - The resolved collections
 */
export function debugCollectionResolution(
  blockName: string,
  resolvedCollections: Record<string, any[]>
): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Collection Resolver] Resolved collections for block: ${blockName}`)
    console.log('Resolved collections:', Object.keys(resolvedCollections))
    console.log('---')
  }
}