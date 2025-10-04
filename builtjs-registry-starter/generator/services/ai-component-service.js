/**
 * AI Component Generation Service
 * 
 * Uses OpenAI API to generate React components based on Built.js configuration
 */

const OpenAI = require('openai');
const fs = require('fs').promises;
const path = require('path');

class AIComponentService {
  constructor() {
    this.client = null;
    this.isInitialized = false;
  }

  async initialize() {
    try {
      // Load environment variables
      require('dotenv').config({ path: path.join(process.cwd(), '.env') });
      
      const apiKey = process.env.OPENAI_API_KEY;
      
      if (!apiKey) {
        console.warn('⚠️ OPENAI_API_KEY not found in .env file. Using template-based generation instead.');
        return false;
      }

      this.client = new OpenAI({
        apiKey: apiKey,
      });

      // Test the connection
      await this.client.models.list();
      this.isInitialized = true;
      
      console.log('✅ OpenAI API initialized successfully');
      return true;
    } catch (error) {
      console.warn('⚠️ Failed to initialize OpenAI API:', error.message);
      console.warn('   Using template-based generation instead.');
      return false;
    }
  }

  async generateComponent(section, template, designSystem, collections = {}) {
    if (!this.isInitialized) {
      return this.generateTemplateComponent(section, template, designSystem);
    }

    try {
      const prompt = this.buildComponentPrompt(section, template, designSystem, collections);
      
      console.log(`🤖 Generating ${section.name} component with AI...`);
      
      const response = await this.client.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: this.getSystemPrompt()
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      });

      const generatedCode = response.choices[0].message.content;
      
      // Extract the component code from the response
      const componentCode = this.extractComponentCode(generatedCode);
      
      console.log(`✅ AI generated component for ${section.name}`);
      return componentCode;
      
    } catch (error) {
      console.warn(`⚠️ AI generation failed for ${section.name}:`, error.message);
      console.warn('   Falling back to template-based generation.');
      return this.generateTemplateComponent(section, template, designSystem);
    }
  }

  getSystemPrompt() {
    return `You are an expert React/TypeScript developer specializing in ShadCN UI components and Tailwind CSS.

Your task is to generate high-quality React components that:
1. Use ShadCN UI components (Button, Card, Badge, etc.)
2. Follow TypeScript best practices with proper interfaces
3. Use Tailwind CSS for styling with design system variations
4. Are accessible and responsive
5. Follow the Built.js component structure with content prop

IMPORTANT RULES:
- Always return ONLY the component code, no explanations or markdown
- Use proper TypeScript interfaces
- Import only necessary ShadCN components
- Use Lucide React icons when appropriate
- Make components responsive and accessible
- Follow the exact prop structure: content: { data?, collections? }
- Use meaningful default values
- Apply design system-specific styling

Return clean, production-ready React component code.`;
  }

  buildComponentPrompt(section, template, designSystem, collections) {
    const componentName = this.getComponentName(section, template, designSystem);
    const interfaceName = `${componentName}Props`;
    
    // Determine if this is a detail template
    const isDetailTemplate = template.contentType && template.contentType.name;
    const contentTypeName = isDetailTemplate ? template.contentType.name : null;
    
    // Generate the correct interface based on template type
    const interfaceDefinition = this.generateInterfaceDefinition(componentName, interfaceName, isDetailTemplate, contentTypeName, section);
    
    let prompt = `Generate a React component for a ${section.title} section.

COMPONENT DETAILS:
- Component Name: ${componentName}
- Template: ${template.title}
- Design System: ${designSystem.name}
- Description: ${template.description || 'No description provided'}
- Template Type: ${isDetailTemplate ? `Detail template for ${contentTypeName} entries` : 'Regular section template'}

REQUIRED INTERFACE:
${interfaceDefinition}

SECTION DATA:
${JSON.stringify(section.data || {}, null, 2)}

SECTION COLLECTIONS:
${Object.keys(collections).length > 0 ? JSON.stringify(collections, null, 2) : 'No collections'}

DESIGN SYSTEM STYLING:
The ${designSystem.name} design system should use:
- ${designSystem.description}

Generate a complete React component with:
1. The exact interface shown above
2. ShadCN UI components
3. Responsive design
4. Design system styling
5. Collection data handling
6. Meaningful default values

Return ONLY the component code.`;

    return prompt;
  }

  generateInterfaceDefinition(componentName, interfaceName, isDetailTemplate, contentTypeName, section) {
    
    if (isDetailTemplate) {
      // Detail template interface - has content.entry, optional content.data and content.collections
      const result = `interface ${interfaceName} {
  content: {
    entry: {
      _id: string;
      _type: "${contentTypeName}";
      ${this.generateContentTypeFields(contentTypeName)}
    };
    data?: {
      ${this.generateDataInterface(section)}
    };
    collections?: {
      ${this.generateCollectionsInterface(section)}
    };
  };
}`;
      return result;
    } else {
      // Regular template interface - only optional content.data and content.collections
      const result = `interface ${interfaceName} {
  content?: {
    data?: {
      ${this.generateDataInterface(section)}
    };
    collections?: {
      ${this.generateCollectionsInterface(section)}
    };
  };
}`;
      return result;
    }
  }

  generateContentTypeFields(contentTypeName) {
    // This would ideally come from the content types configuration
    // For now, provide common fields based on content type name
    const commonFields = {
      product: `name: string;
      slug: string;
      description: string;
      price: number;
      image: {
        url: string;
        width: number;
        height: number;
        type: string;
      };
      images?: Array<{
        url: string;
        width: number;
        height: number;
        type: string;
      }>;`,
      
      blogItem: `title: string;
      slug: string;
      content: any; // PortableText
      image: {
        url: string;
        width: number;
        height: number;
        type: string;
      };
      author: string;
      publishedAt: string;`,
      
      teamMember: `name: string;
      slug: string;
      role: string;
      bio: string;
      image: {
        url: string;
        width: number;
        height: number;
        type: string;
      };`,
      
      category: `name: string;
      slug: string;
      description?: string;`,
      
      benefit: `title: string;
      description: string;
      icon?: string;`
    };
    
    return commonFields[contentTypeName] || `// Add fields specific to ${contentTypeName} content type`;
  }

  extractComponentCode(response) {
    // Remove markdown code blocks if present
    let code = response.replace(/```tsx?\n?/g, '').replace(/```\n?/g, '');
    
    // Remove any leading/trailing whitespace
    code = code.trim();
    
    // Ensure it starts with import React
    if (!code.includes('import React')) {
      code = `import React from 'react'\n${code}`;
    }
    
    return code;
  }

  getComponentName(section, template, designSystem) {
    const sectionName = section.name.replace(/([A-Z])/g, '$1').replace(/^./, str => str.toUpperCase());
    const templateName = template.name.replace(/([A-Z])/g, '$1').replace(/^./, str => str.toUpperCase());
    const designSystemName = designSystem.name.replace(/^./, str => str.toUpperCase());
    
    return `${sectionName}${templateName}${designSystemName}`;
  }

  generateTemplateComponent(section, template, designSystem) {
    // Fallback to the original template-based generation
    const componentName = this.getComponentName(section, template, designSystem);
    const interfaceName = `${componentName}Props`;
    
    // Determine if this is a detail template
    const isDetailTemplate = template.contentType && template.contentType.name;
    const contentTypeName = isDetailTemplate ? template.contentType.name : null;
    
    // Generate the correct interface based on template type
    const interfaceDefinition = this.generateInterfaceDefinition(componentName, interfaceName, isDetailTemplate, contentTypeName, section);
    
    const result = `import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, Heart, Check, Clock, Menu, Search } from 'lucide-react'

${interfaceDefinition}

export default function ${componentName}({ content }: ${interfaceName}) {
  const data = content?.data || {
    ${this.generateDefaultData(section)}
  }
  
  const collections = content?.collections || {}
  
  ${isDetailTemplate ? `const entry = content?.entry || {
    _id: 'default-id',
    _type: '${contentTypeName}',
    ${this.generateDefaultEntryData(contentTypeName)}
  }` : ''}
  
  return (
    <section className="${this.getSectionClasses(designSystem)}">
      <div className="container px-4 py-20 mx-auto">
        <h2 className="mb-4 text-2xl font-bold">${section.title}</h2>
        <p className="text-muted-foreground">Template-based component for ${section.title}</p>
        ${isDetailTemplate ? `<p className="text-sm text-muted-foreground mt-2">Detail template for ${contentTypeName} entries</p>` : ''}
      </div>
    </section>
  )
}`;
    
    console.log(result.substring(0, 500) + '...');
    return result;
  }

  generateDataInterface(section) {
    const fields = [];
    
    if (section.fields) {
      Object.entries(section.fields).forEach(([name, field]) => {
        const type = this.getTypeScriptType(field.type);
        fields.push(`      ${name}: ${type}`);
      });
    }
    
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
    
    if (section.type === 'body') {
      defaults.push('    heading: "Default Heading"');
      defaults.push('    blurb: "Default description text"');
    }
    
    return defaults.join(',\n');
  }

  generateDefaultEntryData(contentTypeName) {
    const defaults = {
      product: `name: "Sample Product",
    slug: "sample-product",
    description: "A sample product description",
    price: 99.99,
    image: {
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&q=80",
      width: 500,
      height: 500,
      type: "image"
    }`,
      
      blogItem: `title: "Sample Blog Post",
    slug: "sample-blog-post",
    content: [],
    image: {
      url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=500&fit=crop&q=80",
      width: 500,
      height: 500,
      type: "image"
    },
    author: "Sample Author",
    publishedAt: "2024-01-01"`,
      
      teamMember: `name: "Sample Team Member",
    slug: "sample-team-member",
    role: "Sample Role",
    bio: "Sample bio text",
    image: {
      url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&q=80",
      width: 500,
      height: 500,
      type: "image"
    }`,
      
      category: `name: "Sample Category",
    slug: "sample-category",
    description: "Sample category description"`,
      
      benefit: `title: "Sample Benefit",
    description: "Sample benefit description",
    icon: "check"`
    };
    
    return defaults[contentTypeName] || `// Add default data for ${contentTypeName}`;
  }

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
}

module.exports = AIComponentService;
