#!/usr/bin/env node

/**
 * Test Template-Based Generation
 */

const AIComponentService = require('./generator/services/ai-component-service');
const ConfigParser = require('./generator/parsers/config-parser');

async function testTemplateGeneration() {
  console.log('🔍 Testing Template-Based Generation');
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
    
    console.log('Testing template-based generation...');
    const componentCode = await aiService.generateComponent(section, template, designSystem, {});
    
    console.log('\nGenerated Component:');
    console.log(componentCode);
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    console.log(error.stack);
  }
}

testTemplateGeneration();
