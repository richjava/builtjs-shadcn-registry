#!/usr/bin/env node

/**
 * Debug Template Detection
 */

const AIComponentService = require('./generator/services/ai-component-service');
const ConfigParser = require('./generator/parsers/config-parser');

async function debugTemplateDetection() {
  console.log('🔍 Debugging Template Detection');
  console.log('=' .repeat(40));
  
  try {
    // Parse configuration
    const parser = new ConfigParser('./data');
    const config = await parser.parse();
    
    if (!config) {
      console.log('❌ Failed to parse configuration');
      return;
    }
    
    const aiService = new AIComponentService();
    
    // Test the article1 template
    const section = config.sections.find(s => s.name === 'productArticleLanding');
    const template = config.templates.find(t => t.name === 'article1');
    const designSystem = config.theme.designSystems[0];
    
    console.log('Template:', template);
    console.log('Has contentType:', !!template.contentType);
    console.log('ContentType name:', template.contentType?.name);
    
    // Test the interface generation
    const isDetailTemplate = template.contentType && template.contentType.name;
    console.log('Is detail template:', isDetailTemplate);
    
    if (isDetailTemplate) {
      const interfaceDef = aiService.generateInterfaceDefinition(
        'TestComponent', 
        'TestComponentProps', 
        true, 
        template.contentType.name, 
        section
      );
      console.log('\nGenerated Interface:');
      console.log(interfaceDef);
    }
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    console.log(error.stack);
  }
}

debugTemplateDetection();
