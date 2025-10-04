/**
 * Component Generator
 * 
 * Generates React components for each block with design system variations.
 * Uses AI service when OpenAI API key is available, falls back to templates.
 */

const fs = require('fs').promises;
const path = require('path');

// Clear require cache to ensure we get the latest AI service
delete require.cache[require.resolve('../services/ai-component-service')];
const AIComponentService = require('../services/ai-component-service');

class ComponentGenerator {
  constructor(config, outputPath) {
    this.config = config;
    this.outputPath = outputPath;
    this.designSystems = config.theme.designSystems || [];
    this.aiService = new AIComponentService();
  }

  async generate() {
    console.log('⚛️ Generating React components...');
    
    // Initialize AI service
    const aiEnabled = await this.aiService.initialize();
    if (aiEnabled) {
      console.log('🤖 AI-powered component generation enabled');
    } else {
      console.log('📝 Using template-based component generation');
    }
    
    const outputDir = path.join(this.outputPath, 'generated-registry');
    
    // Generate components for main sections
    for (const section of this.config.sections) {
      for (const templateName of section.templates) {
        const template = this.config.templates.find(t => t.name === templateName);
        if (template) {
          if (section.type === 'layout') {
            // Generate layout components separately (no design system variations)
            await this.generateLayoutComponent(section, template, outputDir);
          } else {
            // Generate regular block components with design system variations
            await this.generateSectionComponents(section, template, outputDir);
          }
        }
      }
    }
    
    // Generate components for plugin sections
    for (const plugin of this.config.plugins) {
      for (const section of plugin.sections) {
        for (const templateName of section.templates) {
          const template = plugin.templates.find(t => t.name === templateName);
          if (template) {
            if (section.type === 'layout') {
              // Generate layout components separately (no design system variations)
              await this.generateLayoutComponent(section, template, outputDir, plugin.name);
            } else {
              // Generate regular block components with design system variations
              await this.generateSectionComponents(section, template, outputDir, plugin.name);
            }
          }
        }
      }
    }
    
    // Generate shared components
    await this.generateSharedComponents(outputDir);
    
    console.log('✅ React components generated successfully');
  }

  async generateSectionComponents(section, template, outputDir, pluginName = null) {
    const moduleName = pluginName || this.getModuleName(section);
    const sectionSlug = this.getSectionSlug(section);
    
    for (const designSystem of this.designSystems) {
      const componentDir = path.join(outputDir, 'blocks', moduleName, sectionSlug, designSystem.name);
      await fs.mkdir(componentDir, { recursive: true });
      
      // Get collections data for this section
      const collections = this.getCollectionsForSection(section);
      
      // Generate component using AI service (falls back to template if AI unavailable)
      const componentContent = await this.aiService.generateComponent(
        section, 
        template, 
        designSystem, 
        collections
      );
      
      await fs.writeFile(
        path.join(componentDir, 'component.tsx'),
        componentContent
      );
    }
  }

  async generateLayoutComponent(section, template, outputDir, pluginName = null) {
    const sectionSlug = this.getSectionSlug(section);
    
    // Create layout component directory (no design system subdirectory)
    // For plugins, use plugin namespace; for main sections, use section name directly
    const baseDir = pluginName ? pluginName : sectionSlug;
    const componentDir = path.join(outputDir, 'blocks', baseDir, template.name);
    await fs.mkdir(componentDir, { recursive: true });
    
    const componentContent = await this.generateLayoutComponentContent(section, template);
    await fs.writeFile(
      path.join(componentDir, 'component.tsx'),
      componentContent
    );
  }

  async generateLayoutComponentContent(section, template) {
    const componentName = this.getLayoutComponentName(section, template);
    const interfaceName = `${componentName}Props`;
    
    return `import React from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

interface ${interfaceName} {
  content?: {
    data?: {
      ${this.generateDataInterface(section)}
    }
    collections?: {
      ${this.generateCollectionsInterface(section)}
    }
  }
}

export default function ${componentName}({ content }: ${interfaceName}) {
  const data = content?.data || {
    ${this.generateDefaultData(section)}
  }
  
  const collections = content?.collections || {}
  
  return (
    ${this.generateLayoutJSX(section, template)}
  )
}`;
  }

  generateLayoutJSX(section, template) {
    if (section.name === 'header') {
      return this.generateHeaderLayoutJSX(section, template);
    } else if (section.name === 'footer') {
      return this.generateFooterLayoutJSX(section, template);
    } else {
      return this.generateDefaultLayoutJSX(section, template);
    }
  }

  generateHeaderLayoutJSX(section, template) {
    return `<header className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-xl">Logo</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">About</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
          </nav>
          <Button variant="outline" size="sm">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>`;
  }

  generateFooterLayoutJSX(section, template) {
    return `<footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">L</span>
            </div>
            <span className="font-semibold">Logo</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 Your Company. All rights reserved.
          </div>
        </div>
      </div>
    </footer>`;
  }

  generateDefaultLayoutJSX(section, template) {
    return `<div className="layout-component">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">${section.title}</h2>
        <p className="text-muted-foreground">${section.title} layout component</p>
      </div>
    </div>`;
  }

  getLayoutComponentName(section, template) {
    const sectionName = section.name.replace(/([A-Z])/g, '$1').replace(/^./, str => str.toUpperCase());
    const templateName = template.name.replace(/([A-Z])/g, '$1').replace(/^./, str => str.toUpperCase());
    
    return `${sectionName}${templateName}`;
  }

  async generateComponentContent(section, template, designSystem) {
    const componentName = this.getComponentName(section, template, designSystem);
    const interfaceName = `${componentName}Props`;
    
    return `import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, Heart, Check, Clock, Menu, Search } from 'lucide-react'

interface ${interfaceName} {
  content: {
    data?: {
      ${this.generateDataInterface(section)}
    }
    collections?: {
      ${this.generateCollectionsInterface(section)}
    }
  }
}

export default function ${componentName}({ content }: ${interfaceName}) {
  const data = content.data || {
    ${this.generateDefaultData(section)}
  }
  
  const collections = content.collections || {}
  
  return (
    <section className="${this.getSectionClasses(designSystem)}">
      ${this.generateComponentJSX(section, template, designSystem)}
    </section>
  )
}`;
  }

  generateDataInterface(section) {
    const fields = [];
    
    if (section.fields) {
      Object.entries(section.fields).forEach(([name, field]) => {
        const type = this.getTypeScriptType(field.type);
        fields.push(`      ${name}: ${type}`);
      });
    }
    
    // Add common fields
    if (section.type === 'body') {
      fields.push('      heading: string');
      fields.push('      blurb: string');
    }
    
    return fields.join('\n');
  }

  generateCollectionsInterface(section) {
    const collections = [];
    
    if (section.collections) {
      Object.keys(section.collections).forEach(name => {
        collections.push(`      ${name}?: any[]`);
      });
    }
    
    return collections.join('\n');
  }

  generateDefaultData(section) {
    const defaults = [];
    
    if (section.data) {
      Object.entries(section.data).forEach(([key, value]) => {
        if (typeof value === 'string') {
          defaults.push(`    ${key}: "${value}"`);
        } else {
          defaults.push(`    ${key}: ${JSON.stringify(value)}`);
        }
      });
    }
    
    // Add common defaults
    if (section.type === 'body') {
      defaults.push('    heading: "Default Heading"');
      defaults.push('    blurb: "Default description text"');
    }
    
    return defaults.join(',\n');
  }

  generateComponentJSX(section, template, designSystem) {
    const jsx = [];
    
    // Generate JSX based on template category
    switch (template.category) {
      case 'headers':
        jsx.push(this.generateHeaderJSX(section, designSystem));
        break;
      case 'covers':
        jsx.push(this.generateCoverJSX(section, designSystem));
        break;
      case 'cards':
        jsx.push(this.generateCardsJSX(section, designSystem));
        break;
      case 'lists':
        jsx.push(this.generateListJSX(section, designSystem));
        break;
      case 'blocks':
        jsx.push(this.generateBlockJSX(section, designSystem));
        break;
      default:
        jsx.push(this.generateDefaultJSX(section, designSystem));
    }
    
    return jsx.join('\n');
  }

  generateHeaderJSX(section, designSystem) {
    return `      <header className="${this.getHeaderClasses(designSystem)}">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">L</span>
              </div>
              <span className="font-bold text-xl">Logo</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">About</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
            </nav>
            <Button variant="outline" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>`;
  }

  generateCoverJSX(section, designSystem) {
    return `      <div className="${this.getCoverClasses(designSystem)}">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="${this.getHeadingClasses(designSystem)}">
                {data.heading}
              </h1>
              <p className="${this.getTextClasses(designSystem)}">
                {data.blurb}
              </p>
              <div className="mt-8">
                <Button size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>`;
  }

  generateCardsJSX(section, designSystem) {
    return `      <div className="${this.getCardsClasses(designSystem)}">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="${this.getHeadingClasses(designSystem)}">
              {data.heading || 'Our Team'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.teamMember?.slice(0, 3).map((member, index) => (
              <Card key={index} className="${this.getCardClasses(designSystem)}">
                <div className="aspect-square bg-muted rounded-t-lg"></div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{member.role}</p>
                  <p className="text-sm">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>`;
  }

  generateListJSX(section, designSystem) {
    return `      <div className="${this.getListClasses(designSystem)}">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="${this.getHeadingClasses(designSystem)}">
              {data.heading || 'Features'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.benefit?.slice(0, 6).map((benefit, index) => (
              <div key={index} className="${this.getListItemClasses(designSystem)}">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg">{benefit.title}</h3>
                </div>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>`;
  }

  generateBlockJSX(section, designSystem) {
    return `      <div className="${this.getBlockClasses(designSystem)}">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="${this.getHeadingClasses(designSystem)}">
              {data.heading || 'Our Mission'}
            </h2>
            <p className="${this.getTextClasses(designSystem)}">
              {data.blurb || 'Default mission statement'}
            </p>
            <div className="mt-8">
              <Button size="lg" className="gap-2">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>`;
  }

  generateDefaultJSX(section, designSystem) {
    return `      <div className="${this.getDefaultClasses(designSystem)}">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="${this.getHeadingClasses(designSystem)}">
              {data.heading || 'Section Title'}
            </h2>
            <p className="${this.getTextClasses(designSystem)}">
              {data.blurb || 'Section description'}
            </p>
          </div>
        </div>
      </div>`;
  }

  // Design System Classes
  getSectionClasses(designSystem) {
    const classes = {
      skeleton: 'py-20 bg-background',
      standard: 'py-20 bg-background',
      minimal: 'py-32 bg-white',
      bold: 'py-32 bg-gradient-to-br from-slate-50 to-blue-50',
      neobrutalism: 'py-32 bg-white border-4 border-black'
    };
    return classes[designSystem.name] || classes.skeleton;
  }

  getHeaderClasses(designSystem) {
    const classes = {
      skeleton: 'border-b bg-background/95 backdrop-blur',
      standard: 'border-b bg-background/95 backdrop-blur',
      minimal: 'border-b border-gray-200 bg-white',
      bold: 'border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50',
      neobrutalism: 'border-b-4 border-black bg-white'
    };
    return classes[designSystem.name] || classes.skeleton;
  }

  getCoverClasses(designSystem) {
    const classes = {
      skeleton: 'bg-background',
      standard: 'bg-background',
      minimal: 'bg-white',
      bold: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
      neobrutalism: 'bg-white border-4 border-black'
    };
    return classes[designSystem.name] || classes.skeleton;
  }

  getCardsClasses(designSystem) {
    const classes = {
      skeleton: 'bg-background',
      standard: 'bg-background',
      minimal: 'bg-white',
      bold: 'bg-white',
      neobrutalism: 'bg-white border-4 border-black'
    };
    return classes[designSystem.name] || classes.skeleton;
  }

  getListClasses(designSystem) {
    const classes = {
      skeleton: 'bg-background',
      standard: 'bg-background',
      minimal: 'bg-white',
      bold: 'bg-white',
      neobrutalism: 'bg-white border-4 border-black'
    };
    return classes[designSystem.name] || classes.skeleton;
  }

  getBlockClasses(designSystem) {
    const classes = {
      skeleton: 'bg-background',
      standard: 'bg-background',
      minimal: 'bg-white',
      bold: 'bg-white',
      neobrutalism: 'bg-white border-4 border-black'
    };
    return classes[designSystem.name] || classes.skeleton;
  }

  getDefaultClasses(designSystem) {
    const classes = {
      skeleton: 'bg-background',
      standard: 'bg-background',
      minimal: 'bg-white',
      bold: 'bg-white',
      neobrutalism: 'bg-white border-4 border-black'
    };
    return classes[designSystem.name] || classes.skeleton;
  }

  getHeadingClasses(designSystem) {
    const classes = {
      skeleton: 'text-4xl font-bold mb-6 text-foreground',
      standard: 'text-4xl font-bold mb-6 text-foreground',
      minimal: 'text-6xl font-thin mb-12 text-gray-900 tracking-tight',
      bold: 'text-7xl font-black mb-8 text-white tracking-tight',
      neobrutalism: 'text-5xl font-black mb-8 text-black'
    };
    return classes[designSystem.name] || classes.skeleton;
  }

  getTextClasses(designSystem) {
    const classes = {
      skeleton: 'text-xl text-muted-foreground mb-8',
      standard: 'text-xl text-muted-foreground mb-8',
      minimal: 'text-xl text-gray-600 font-light leading-relaxed mb-8',
      bold: 'text-2xl text-blue-100 font-medium leading-relaxed mb-8',
      neobrutalism: 'text-xl text-black font-bold mb-8'
    };
    return classes[designSystem.name] || classes.skeleton;
  }

  getCardClasses(designSystem) {
    const classes = {
      skeleton: 'hover:shadow-lg transition-shadow',
      standard: 'hover:shadow-lg transition-shadow',
      minimal: 'border border-gray-200 hover:shadow-md transition-shadow',
      bold: 'border-2 border-blue-200 hover:shadow-xl transition-all hover:scale-105',
      neobrutalism: 'border-4 border-black hover:shadow-lg transition-all'
    };
    return classes[designSystem.name] || classes.skeleton;
  }

  getListItemClasses(designSystem) {
    const classes = {
      skeleton: 'p-6 rounded-lg bg-card hover:shadow-md transition-shadow',
      standard: 'p-6 rounded-lg bg-card hover:shadow-md transition-shadow',
      minimal: 'p-8 rounded-lg bg-white border border-gray-200',
      bold: 'p-6 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200 hover:shadow-xl transition-all',
      neobrutalism: 'p-6 border-4 border-black bg-white hover:shadow-lg transition-all'
    };
    return classes[designSystem.name] || classes.skeleton;
  }

  getTypeScriptType(fieldType) {
    const typeMap = {
      'string': 'string',
      'text': 'string',
      'number': 'number',
      'boolean': 'boolean',
      'image': 'object',
      'array': 'any[]',
      'object': 'object',
      'uid': 'string',
      'relation': 'object'
    };
    return typeMap[fieldType] || 'string';
  }

  getComponentName(section, template, designSystem) {
    const sectionName = section.name.replace(/([A-Z])/g, '$1').replace(/^./, str => str.toUpperCase());
    const templateName = template.name.replace(/([A-Z])/g, '$1').replace(/^./, str => str.toUpperCase());
    const designSystemName = designSystem.name.replace(/^./, str => str.toUpperCase());
    
    return `${sectionName}${templateName}${designSystemName}`;
  }

  getCollectionsForSection(section) {
    const collections = {};
    
    if (section.collections) {
      Object.keys(section.collections).forEach(collectionName => {
        // Get sample data from config collections
        const collectionData = this.config.collections[collectionName];
        if (collectionData && collectionData.data) {
          collections[collectionName] = collectionData.data.slice(0, 3); // Limit to 3 items for AI context
        } else {
          collections[collectionName] = [];
        }
      });
    }
    
    return collections;
  }

  getModuleName(section) {
    if (section.name.includes('home')) return 'main';
    if (section.name.includes('product')) return 'shop';
    if (section.name.includes('about')) return 'about';
    if (section.name.includes('team')) return 'team';
    if (section.name.includes('blog')) return 'blog';
    if (section.name.includes('contact')) return 'main';
    return 'main';
  }

  getSectionSlug(section) {
    return section.name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  }

  async generateSharedComponents(outputDir) {
    const sharedDir = path.join(outputDir, 'components', 'shared');
    await fs.mkdir(sharedDir, { recursive: true });
    
    // Generate portable text components
    const portableTextContent = `import React from 'react'

export function createPortableTextComponents(designSystem: string) {
  const baseClasses = {
    standard: {
      h1: 'text-3xl font-bold mb-4 text-foreground',
      h2: 'text-2xl font-semibold mb-3 text-foreground',
      h3: 'text-xl font-semibold mb-2 text-foreground',
      p: 'text-base text-muted-foreground mb-4',
      ul: 'list-disc list-inside mb-4',
      li: 'text-base text-muted-foreground mb-1',
      strong: 'font-semibold text-foreground',
      code: 'bg-muted px-2 py-1 rounded text-sm font-mono',
      blockquote: 'border-l-4 border-primary pl-4 italic text-muted-foreground'
    },
    minimal: {
      h1: 'text-4xl font-thin mb-6 text-gray-900 tracking-tight',
      h2: 'text-3xl font-light mb-4 text-gray-900 tracking-tight',
      h3: 'text-2xl font-light mb-3 text-gray-900 tracking-tight',
      p: 'text-lg text-gray-600 font-light leading-relaxed mb-6',
      ul: 'list-none mb-6',
      li: 'text-lg text-gray-600 font-light mb-2',
      strong: 'font-medium text-gray-900',
      code: 'bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800',
      blockquote: 'border-l-2 border-gray-300 pl-6 italic text-gray-600'
    },
    bold: {
      h1: 'text-4xl font-black mb-6 text-white',
      h2: 'text-3xl font-bold mb-4 text-white',
      h3: 'text-2xl font-bold mb-3 text-white',
      p: 'text-lg text-blue-100 font-medium leading-relaxed mb-6',
      ul: 'list-disc list-inside mb-6',
      li: 'text-lg text-blue-100 font-medium mb-2',
      strong: 'font-black text-white',
      code: 'bg-blue-900 px-3 py-2 rounded text-sm font-mono text-blue-100',
      blockquote: 'border-l-4 border-yellow-400 pl-6 italic text-blue-100'
    },
    neobrutalism: {
      h1: 'text-4xl font-black mb-6 text-black',
      h2: 'text-3xl font-black mb-4 text-black',
      h3: 'text-2xl font-black mb-3 text-black',
      p: 'text-lg text-black font-bold mb-6',
      ul: 'list-none mb-6',
      li: 'text-lg text-black font-bold mb-2',
      strong: 'font-black text-black',
      code: 'bg-yellow-400 px-3 py-2 border-2 border-black text-sm font-mono text-black',
      blockquote: 'border-l-4 border-black pl-6 italic text-black bg-yellow-400'
    }
  }

  const classes = baseClasses[designSystem as keyof typeof baseClasses] || baseClasses.standard

  return {
    types: {
      h1: ({ children }: any) => <h1 className={classes.h1}>{children}</h1>,
      h2: ({ children }: any) => <h2 className={classes.h2}>{children}</h2>,
      h3: ({ children }: any) => <h3 className={classes.h3}>{children}</h3>,
      p: ({ children }: any) => <p className={classes.p}>{children}</p>,
      ul: ({ children }: any) => <ul className={classes.ul}>{children}</ul>,
      li: ({ children }: any) => <li className={classes.li}>{children}</li>,
      strong: ({ children }: any) => <strong className={classes.strong}>{children}</strong>,
      code: ({ children }: any) => <code className={classes.code}>{children}</code>,
      blockquote: ({ children }: any) => <blockquote className={classes.blockquote}>{children}</blockquote>
    }
  }
}`;

    await fs.writeFile(
      path.join(sharedDir, 'portable-text-components.tsx'),
      portableTextContent
    );

    // Generate index file
    const indexContent = `export { createPortableTextComponents } from './portable-text-components'`;

    await fs.writeFile(
      path.join(sharedDir, 'index.ts'),
      indexContent
    );
  }
}

module.exports = ComponentGenerator;
