'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Block {
  name: string
  moduleName: string
  sectionName: string
  templateName: string
  designSystem: string
  description: string
}

interface Module {
  name: string
  label: string
  sections: Section[]
}

interface Section {
  name: string
  label: string
  blocks: Block[]
}

const designSystems = [
  { name: 'standard', label: 'Standard', color: 'bg-blue-100 border-blue-300' },
  { name: 'minimal', label: 'Minimal', color: 'bg-gray-100 border-gray-300' },
  { name: 'bold', label: 'Bold', color: 'bg-purple-100 border-purple-300' },
  { name: 'neobrutalism', label: 'Neobrutalism', color: 'bg-yellow-100 border-yellow-300' }
]

// Helper function to convert camelCase to Title Case
function toTitleCase(str: string): string {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

function TemplatePreviewGrid() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [selectedModule, setSelectedModule] = useState<string>('Main')
  const [selectedSection, setSelectedSection] = useState<string>('')
  const [loadedIframes, setLoadedIframes] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    // Load registry data from root
    console.log('Starting to fetch registry data...')
    
    // Simple test first
    const testFetch = async () => {
      try {
        console.log('About to fetch...')
        const response = await fetch('/api/registry')
        console.log('Got response:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Got data:', data)
        const blocksData: Block[] = data.blocks || []
        console.log('Processing blocks:', blocksData.length)
        setBlocks(blocksData)
        
        // Group blocks by module and section
        const moduleMap = new Map<string, Module>()
        
        blocksData.forEach(block => {
          const moduleName = block.moduleName
          const sectionName = block.sectionName
          
          if (!moduleMap.has(moduleName)) {
            moduleMap.set(moduleName, {
              name: moduleName,
              label: toTitleCase(moduleName),
              sections: []
            })
          }
          
          const module = moduleMap.get(moduleName)!
          let section = module.sections.find(s => s.name === sectionName)
          
          if (!section) {
            section = {
              name: sectionName,
              label: toTitleCase(sectionName),
              blocks: []
            }
            module.sections.push(section)
          }
          
          section.blocks.push(block)
        })
        
        const modulesArray = Array.from(moduleMap.values())
        console.log('All modules and sections:', modulesArray.map(m => ({
          name: m.name,
          label: m.label,
          sections: m.sections.map(s => ({ name: s.name, label: s.label }))
        })))
        setModules(modulesArray)
        
        // Set default module and section for Main module
        const mainModule = modulesArray.find(m => m.name === 'main')
        if (mainModule && mainModule.sections.length > 0) {
          setSelectedModule(mainModule.label)
          setSelectedSection(mainModule.sections[0].label)
        }
        
        console.log('Setting loading to false')
        setLoading(false)
        console.log('Loading state should now be false')
      } catch (err) {
        console.error('Failed to load registry:', err)
        console.error('Error details:', err)
        console.error('Error stack:', err instanceof Error ? err.stack : 'No stack trace')
        setLoading(false)
      }
    }
    
    testFetch()
  }, [])

  const handleIframeLoad = (blockName: string) => {
    setLoadedIframes(prev => new Set(prev).add(blockName))
  }

  const handleModuleChange = (newModule: string) => {
    console.log('Module changed to:', newModule)
    setSelectedModule(newModule)
    
    // Automatically select the first section of the new module
    const module = modules.find(m => m.label === newModule)
    console.log('Found module:', module)
    if (module && module.sections.length > 0) {
      console.log('Module sections:', module.sections.map(s => s.label))
      setSelectedSection(module.sections[0].label)
      console.log('Set selected section to:', module.sections[0].label)
    } else {
      setSelectedSection('')
      console.log('No sections found, cleared selected section')
    }
  }

  const getCurrentSectionBlocks = () => {
    console.log('getCurrentSectionBlocks - selectedModule:', selectedModule, 'selectedSection:', selectedSection)
    const module = modules.find(m => m.label === selectedModule)
    console.log('Found module for blocks:', module)
    if (!module) {
      console.log('No module found, returning empty array')
      return []
    }
    
    const section = module.sections.find(s => s.label === selectedSection)
    console.log('Found section for blocks:', section)
    if (!section) {
      console.log('No section found, returning empty array')
      return []
    }
    
    console.log('Section blocks:', section.blocks.map(b => ({ name: b.name, designSystem: b.designSystem })))
    
    // Group blocks by design system
    const designSystemMap = new Map<string, Block>()
    section.blocks.forEach(block => {
      designSystemMap.set(block.designSystem, block)
    })
    
    const result = Array.from(designSystemMap.values())
    console.log('Grouped blocks by design system:', result.map(b => ({ name: b.name, designSystem: b.designSystem })))
    return result
  }

  const currentBlocks = getCurrentSectionBlocks()

  console.log('Component render - loading:', loading, 'modules:', modules.length, 'blocks:', blocks.length)
  console.log('Current blocks:', currentBlocks.length)
  console.log('Selected module:', selectedModule, 'Selected section:', selectedSection)

  if (loading) {
    return (
      <div className="w-full">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Template Previews</h2>
          <p className="text-lg text-muted-foreground">
            See our templates in action across different design systems
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Template Previews</h2>
        <p className="text-lg text-muted-foreground">
          See our templates in action across different design systems
        </p>
      </div>
      
      {/* Module and Section Selectors */}
      <div className="flex flex-col justify-center gap-4 mb-8 sm:flex-row">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Module</label>
          <Select value={selectedModule} onValueChange={handleModuleChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {modules.map(module => (
                <SelectItem key={module.name} value={module.label}>
                  {module.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Section</label>
          <Select 
            value={selectedSection} 
            onValueChange={setSelectedSection}
            disabled={!selectedModule}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              {modules
                .find(m => m.label === selectedModule)
                ?.sections.map(section => (
                  <SelectItem key={section.name} value={section.label}>
                    {section.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Design System Preview Cards */}
      {currentBlocks.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {designSystems.map(designSystem => {
        const block = currentBlocks.find(b => b.designSystem === designSystem.name)
            
            if (!block) {
              return (
                <div key={designSystem.name} className="group">
                  <div className="p-8 text-center border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="mb-2 text-gray-400">
                      <div className="w-12 h-12 mx-auto bg-gray-200 rounded-lg"></div>
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-500">{designSystem.label}</h3>
                    <p className="text-sm text-gray-400">Coming Soon</p>
                  </div>
                </div>
              )
            }

            return (
              <div key={block.name} className="group">
                <div className={`border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${designSystem.color}`}>
                  {/* Header */}
                  <div className="p-4 bg-white border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{designSystem.label}</h3>
                        <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">{block.description}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${designSystem.color.split(' ')[0]} border`}></div>
                </div>
              </div>
              
              {/* Iframe Container */}
              <div className="relative bg-white">
                {/* Loading State */}
                    {!loadedIframes.has(block.name) && (
                      <div className="flex items-center justify-center h-64 bg-gray-50">
                    <div className="text-center">
                          <div className="w-6 h-6 mx-auto mb-2 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                          <p className="text-xs text-gray-500">Loading...</p>
                    </div>
                  </div>
                )}
                
                {/* Iframe */}
                <iframe
                      src={`/preview/${block.name}?thumbnail=true`}
                      className={`w-full h-64 border-0 transition-opacity duration-300 ${
                        loadedIframes.has(block.name) ? 'opacity-100' : 'opacity-0 absolute'
                      }`}
                      onLoad={() => handleIframeLoad(block.name)}
                      title={`${designSystem.label} design system preview`}
                  sandbox="allow-scripts allow-same-origin"
                />
                
                {/* Overlay for interaction */}
                    <div className="absolute inset-0 transition-colors duration-300 bg-transparent pointer-events-none group-hover:bg-black/5" />
              </div>
              
              {/* Footer */}
              <div className="p-4 bg-white border-t">
                    <div className="flex items-center justify-between">
                      <Link 
                        href={`/preview/${block.name}`}
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View Template →
                      </Link>
                <Link 
                        href={`/category/${selectedModule.toLowerCase()}`}
                        className="text-xs text-gray-500 hover:text-gray-700"
                >
                        Browse All
                </Link>
              </div>
            </div>
          </div>
              </div>
            )
          })}
        </div>
      )}

      {/* No blocks message */}
      {currentBlocks.length === 0 && selectedModule && selectedSection && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No templates available for the selected section.</p>
      </div>
      )}
    </div>
  )
}

export default dynamic(() => Promise.resolve(TemplatePreviewGrid), { ssr: false })