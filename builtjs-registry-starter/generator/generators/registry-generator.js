/**
 * Registry Generator
 * 
 * Generates the main registry files (registry.json, blocks-index.json, etc.)
 * from the parsed Built.js configuration.
 */

const fs = require('fs').promises;
const path = require('path');

class RegistryGenerator {
  constructor(config, outputPath) {
    this.config = config;
    this.outputPath = outputPath;
    this.designSystems = config.theme.designSystems || [];
  }

  async generate() {
    console.log('📁 Generating registry files...');
    
    const outputDir = path.join(this.outputPath, 'generated-registry');
    await fs.mkdir(outputDir, { recursive: true });
    
    // Generate main registry.json
    await this.generateMainRegistry(outputDir);
    
    // Generate registry-data directory
    const registryDataDir = path.join(outputDir, 'registry-data');
    await fs.mkdir(registryDataDir, { recursive: true });
    
    // Generate blocks-index.json
    await this.generateBlocksIndex(registryDataDir);
    
    // Generate collections-data.json
    await this.generateCollectionsData(registryDataDir);
    
    // Generate content-types.json
    await this.generateContentTypes(registryDataDir);
    
    console.log('✅ Registry files generated successfully');
  }

  async generateMainRegistry(outputDir) {
    const registry = {
      name: this.config.theme.title.toLowerCase().replace(/\s+/g, '-'),
      version: "1.0.0",
      baseUrl: `https://${this.config.theme.title.toLowerCase().replace(/\s+/g, '-')}.vercel.app`,
      dependencies: [
        "class-variance-authority",
        "clsx",
        "tailwind-merge"
      ],
      designSystems: this.designSystems,
      blocks: await this.generateBlockList()
    };

    await fs.writeFile(
      path.join(outputDir, 'registry.json'),
      JSON.stringify(registry, null, 2)
    );
  }

  async generateBlocksIndex(outputDir) {
    const blocksIndex = {};
    
    // Generate blocks for main sections
    for (const section of this.config.sections) {
      for (const templateName of section.templates) {
        const template = this.config.templates.find(t => t.name === templateName);
        if (template) {
          for (const designSystem of this.designSystems) {
            const blockName = this.generateBlockName(section, template, designSystem);
            blocksIndex[blockName] = await this.generateBlockDefinition(section, template, designSystem);
          }
        }
      }
    }
    
    // Generate blocks for plugin sections
    for (const plugin of this.config.plugins) {
      for (const section of plugin.sections) {
        for (const templateName of section.templates) {
          const template = plugin.templates.find(t => t.name === templateName);
          if (template) {
            for (const designSystem of this.designSystems) {
              const blockName = this.generateBlockName(section, template, designSystem, plugin.name);
              blocksIndex[blockName] = await this.generateBlockDefinition(section, template, designSystem, plugin);
            }
          }
        }
      }
    }

    await fs.writeFile(
      path.join(outputDir, 'blocks-index.json'),
      JSON.stringify(blocksIndex, null, 2)
    );
  }

  async generateCollectionsData(outputDir) {
    const collectionsData = { ...this.config.collections };
    
    // Add plugin collections
    for (const plugin of this.config.plugins) {
      Object.assign(collectionsData, plugin.collections);
    }

    await fs.writeFile(
      path.join(outputDir, 'collections-data.json'),
      JSON.stringify(collectionsData, null, 2)
    );
  }

  async generateContentTypes(outputDir) {
    const contentTypes = {};
    
    // Convert content types to Built.js format
    for (const contentType of this.config.contentTypes) {
      contentTypes[contentType.name] = {
        name: contentType.name,
        title: this.capitalizeFirst(contentType.name),
        dataPosition: 1,
        fields: Object.entries(contentType.fields).map(([name, field]) => ({
          name,
          type: this.convertFieldType(field.type),
          required: field.required || false
        }))
      };
    }
    
    // Add plugin content types
    for (const plugin of this.config.plugins) {
      for (const contentType of plugin.contentTypes) {
        contentTypes[contentType.name] = {
          name: contentType.name,
          title: this.capitalizeFirst(contentType.name),
          dataPosition: 1,
          fields: Object.entries(contentType.fields).map(([name, field]) => ({
            name,
            type: this.convertFieldType(field.type),
            required: field.required || false
          }))
        };
      }
    }

    await fs.writeFile(
      path.join(outputDir, 'content-types.json'),
      JSON.stringify(contentTypes, null, 2)
    );
  }

  async generateBlockList() {
    const blocks = [];
    
    // Generate blocks for main sections (exclude layout sections)
    for (const section of this.config.sections) {
      // Skip layout sections (headers, footers) - they're handled separately
      if (section.type === 'layout') {
        continue;
      }
      
      for (const templateName of section.templates) {
        const template = this.config.templates.find(t => t.name === templateName);
        if (template) {
            for (const designSystem of this.designSystems) {
              const blockName = this.generateBlockName(section, template, designSystem);
              blocks.push({
                name: blockName,
                description: `${section.title} ${template.title} template with ${designSystem.title.toLowerCase()} design system.`,
                designSystem: designSystem.name,
                files: [`blocks/${this.getModuleName(section)}/${this.getSectionSlug(section)}/${designSystem.name}/component.tsx`],
                dependencies: ["@radix-ui/react-slot"],
                devDependencies: [],
                tailwind: {},
                cssVars: {},
                shadcnComponents: this.getShadcnComponents(template),
                lucideIcons: this.getLucideIcons(template),
                masterDetail: this.getMasterDetail(section),
                moduleName: this.getModuleName(section),
                sectionName: this.getSectionSlug(section),
                templateName: template.name
              });
            }
        }
      }
    }
    
    // Generate blocks for plugin sections (exclude layout sections)
    for (const plugin of this.config.plugins) {
      for (const section of plugin.sections) {
        // Skip layout sections (headers, footers) - they're handled separately
        if (section.type === 'layout') {
          continue;
        }
        
        for (const templateName of section.templates) {
          const template = plugin.templates.find(t => t.name === templateName);
          if (template) {
            for (const designSystem of this.designSystems) {
              const blockName = this.generateBlockName(section, template, designSystem, plugin.name);
              blocks.push({
                name: blockName,
                description: `${section.title} ${template.title} template with ${designSystem.title.toLowerCase()} design system.`,
                designSystem: designSystem.name,
                files: [`blocks/${plugin.name}/${this.getSectionSlug(section)}/${designSystem.name}/component.tsx`],
                dependencies: ["@radix-ui/react-slot"],
                devDependencies: [],
                tailwind: {},
                cssVars: {},
                shadcnComponents: this.getShadcnComponents(template),
                lucideIcons: this.getLucideIcons(template),
                masterDetail: this.getMasterDetail(section),
                moduleName: plugin.name,
                sectionName: this.getSectionSlug(section),
                templateName: template.name
              });
            }
          }
        }
      }
    }
    
    return blocks;
  }

  generateBlockName(section, template, designSystem, pluginName = null) {
    const moduleName = pluginName || this.getModuleName(section);
    const sectionSlug = this.getSectionSlug(section);
    const templateName = template.name;
    
    return `${moduleName}-${sectionSlug}-${templateName}-${designSystem.name}`;
  }

  async generateBlockDefinition(section, template, designSystem, plugin = null) {
    const blockDef = {
      fields: this.generateFields(section),
      data: section.data || {},
      collections: this.generateCollections(section),
      dependencies: ["@radix-ui/react-slot"],
      shadcnComponents: this.getShadcnComponents(template),
      lucideIcons: this.getLucideIcons(template),
      masterDetail: this.getMasterDetail(section)
    };

    return blockDef;
  }

  generateFields(section) {
    const fields = {};
    
    // Add fields from section schema if available
    if (section.fields) {
      Object.entries(section.fields).forEach(([name, field]) => {
        fields[name] = {
          type: this.convertFieldType(field.type)
        };
      });
    }
    
    // Add common fields based on section type
    if (section.type === 'body') {
      fields.heading = { type: 'string' };
      fields.blurb = { type: 'text' };
    }
    
    return fields;
  }

  generateCollections(section) {
    const collections = {};
    
    if (section.collections) {
      Object.entries(section.collections).forEach(([name, config]) => {
        collections[name] = {
          config: config.config || { limit: 10 }
        };
      });
    }
    
    return collections;
  }

  getModuleName(section) {
    // Determine module based on section name or type
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

  getShadcnComponents(template) {
    // Determine ShadCN components based on template category
    const components = ['Button'];
    
    if (template.category === 'headers') {
      components.push('NavigationMenu');
    }
    if (template.category === 'cards') {
      components.push('Card');
    }
    if (template.category === 'lists') {
      components.push('Card', 'Badge');
    }
    
    return components;
  }

  getLucideIcons(template) {
    // Determine Lucide icons based on template category
    const icons = ['ArrowRight'];
    
    if (template.category === 'headers') {
      icons.push('Menu', 'Search');
    }
    if (template.category === 'cards') {
      icons.push('Star', 'Heart');
    }
    if (template.category === 'lists') {
      icons.push('Check', 'Clock');
    }
    
    return icons;
  }

  getMasterDetail(section) {
    // Determine master/detail relationship
    const isMaster = section.name.includes('list') || section.name.includes('category');
    const isDetail = section.name.includes('article') || section.name.includes('profile');
    
    return {
      isMaster,
      isDetail
    };
  }

  getDesignSystemLabel(name) {
    const labels = {
      standard: 'Standard',
      minimal: 'Minimal',
      bold: 'Bold',
      neobrutalism: 'Neobrutalism'
    };
    return labels[name] || name;
  }

  getDesignSystemDescription(name) {
    const descriptions = {
      standard: 'Clean, modern standard design with balanced design elements',
      minimal: 'Clean, modern minimal design with clean lines and minimal elements',
      bold: 'Clean, modern bold design with vibrant colors and strong typography',
      neobrutalism: 'Clean, modern neobrutalism design with raw, unpolished aesthetics'
    };
    return descriptions[name] || '';
  }

  convertFieldType(type) {
    const typeMap = {
      'string': 'string',
      'text': 'text',
      'number': 'number',
      'boolean': 'boolean',
      'image': 'image',
      'array': 'array',
      'object': 'object',
      'uid': 'string',
      'relation': 'object'
    };
    return typeMap[type] || 'string';
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

module.exports = RegistryGenerator;
