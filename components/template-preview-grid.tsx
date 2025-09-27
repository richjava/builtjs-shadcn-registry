'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Block {
  name: string
  moduleName: string
  sectionName: string
  templateName: string
  themeName: string
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

const themes = [
  { name: 'standard', label: 'Standard', color: 'bg-blue-100 border-blue-300' },
  { name: 'minimal', label: 'Minimal', color: 'bg-gray-100 border-gray-300' },
  { name: 'bold', label: 'Bold', color: 'bg-purple-100 border-purple-300' },
  { name: 'neobrutalism', label: 'Neobrutalism', color: 'bg-yellow-100 border-yellow-300' }
]

export default function TemplatePreviewGrid() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [selectedModule, setSelectedModule] = useState<string>('Main')
  const [selectedSection, setSelectedSection] = useState<string>('')
  const [loadedIframes, setLoadedIframes] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    // Load registry data
    fetch('/registry.json')
      .then(res => res.json())
      .then(data => {
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
              name: moduleName.toLowerCase(),
              label: moduleName,
              sections: []
            })
          }
          
          const module = moduleMap.get(moduleName)!
          let section = module.sections.find(s => s.label === sectionName)
          
          if (!section) {
            section = {
              name: sectionName.toLowerCase().replace(/\s+/g, '-'),
              label: sectionName,
              blocks: []
            }
            module.sections.push(section)
          }
          
          section.blocks.push(block)
        })
        
        const modulesArray = Array.from(moduleMap.values())
        setModules(modulesArray)
        
        // Set default section for Main module
        const mainModule = modulesArray.find(m => m.label === 'Main')
        if (mainModule && mainModule.sections.length > 0) {
          setSelectedSection(mainModule.sections[0].label)
        }
        
        console.log('Setting loading to false')
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load registry:', err)
        setLoading(false)
      })
  }, [])

  const handleIframeLoad = (blockName: string) => {
    setLoadedIframes(prev => new Set(prev).add(blockName))
  }

  const handleModuleChange = (newModule: string) => {
    setSelectedModule(newModule)
    
    // Automatically select the first section of the new module
    const module = modules.find(m => m.label === newModule)
    if (module && module.sections.length > 0) {
      setSelectedSection(module.sections[0].label)
    } else {
      setSelectedSection('')
    }
  }

  const getCurrentSectionBlocks = () => {
    const module = modules.find(m => m.label === selectedModule)
    if (!module) return []
    
    const section = module.sections.find(s => s.label === selectedSection)
    if (!section) return []
    
    // Group blocks by theme
    const themeMap = new Map<string, Block>()
    section.blocks.forEach(block => {
      themeMap.set(block.theme, block)
    })
    
    return Array.from(themeMap.values())
  }

  const currentBlocks = getCurrentSectionBlocks()

  if (loading) {
    return (
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Template Previews</h2>
          <p className="text-lg text-muted-foreground">
            See our templates in action across different themes
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Template Previews</h2>
        <p className="text-lg text-muted-foreground">
          See our templates in action across different themes
        </p>
      </div>

      {/* Module and Section Selectors */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
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

      {/* Theme Preview Cards */}
      {currentBlocks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {themes.map(theme => {
            const block = currentBlocks.find(b => b.theme === theme.name)
            
            if (!block) {
              return (
                <div key={theme.name} className="group">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="text-gray-400 mb-2">
                      <div className="w-12 h-12 mx-auto bg-gray-200 rounded-lg"></div>
                    </div>
                    <h3 className="font-semibold text-gray-500 mb-2">{theme.label}</h3>
                    <p className="text-sm text-gray-400">Coming Soon</p>
                  </div>
                </div>
              )
            }

            return (
              <div key={block.name} className="group">
                <div className={`border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${theme.color}`}>
                  {/* Header */}
                  <div className="p-4 bg-white border-b">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900">{theme.label}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{block.description}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${theme.color.split(' ')[0]} border`}></div>
                    </div>
                  </div>
                  
                  {/* Iframe Container */}
                  <div className="relative bg-white">
                    {/* Loading State */}
                    {!loadedIframes.has(block.name) && (
                      <div className="h-64 flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
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
                      title={`${theme.label} theme preview`}
                      sandbox="allow-scripts allow-same-origin"
                    />
                    
                    {/* Overlay for interaction */}
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                  </div>
                  
                  {/* Footer */}
                  <div className="p-4 bg-white border-t">
                    <div className="flex items-center justify-between">
                      <Link 
                        href={`/preview/${block.name}`}
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
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
        <div className="text-center py-12">
          <p className="text-gray-500">No templates available for the selected section.</p>
        </div>
      )}
    </div>
  )
}