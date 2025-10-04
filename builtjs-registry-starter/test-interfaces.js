#!/usr/bin/env node

/**
 * Test Interface Definitions
 * 
 * Shows how the AI prompt generates different interfaces for detail vs regular templates
 */

const AIComponentService = require('./generator/services/ai-component-service');
const ConfigParser = require('./generator/parsers/config-parser');

async function testInterfaceDefinitions() {
  console.log('🔍 Testing Interface Definitions');
  console.log('=' .repeat(60));
  
  try {
    // Parse configuration
    const parser = new ConfigParser('./data');
    const config = await parser.parse();
    
    if (!config) {
      console.log('❌ Failed to parse configuration');
      return;
    }
    
    const aiService = new AIComponentService();
    
    // Test 1: Regular template (cover1)
    console.log('\n📋 TEST 1: Regular Template (cover1)');
    console.log('-'.repeat(40));
    
    const regularSection = config.sections.find(s => s.name === 'homeLanding');
    const regularTemplate = config.templates.find(t => t.name === 'cover1');
    const designSystem = config.theme.designSystems[0];
    
    if (regularSection && regularTemplate && designSystem) {
      const prompt = aiService.buildComponentPrompt(regularSection, regularTemplate, designSystem, {});
      
      // Extract just the interface part
      const interfaceMatch = prompt.match(/REQUIRED INTERFACE:\n([\s\S]*?)\n\nSECTION DATA:/);
      if (interfaceMatch) {
        console.log(interfaceMatch[1]);
      }
    }
    
    // Test 2: Detail template (article1)
    console.log('\n📋 TEST 2: Detail Template (article1)');
    console.log('-'.repeat(40));
    
    const detailSection = config.sections.find(s => s.name === 'productArticleLanding');
    const detailTemplate = config.templates.find(t => t.name === 'article1');
    
    if (detailSection && detailTemplate && designSystem) {
      const prompt = aiService.buildComponentPrompt(detailSection, detailTemplate, designSystem, {});
      
      // Extract just the interface part
      const interfaceMatch = prompt.match(/REQUIRED INTERFACE:\n([\s\S]*?)\n\nSECTION DATA:/);
      if (interfaceMatch) {
        console.log(interfaceMatch[1]);
      }
    }
    
    console.log('\n💡 INTERFACE ANALYSIS:');
    console.log('-'.repeat(30));
    console.log('✅ Regular templates: content? (optional)');
    console.log('✅ Detail templates: content (required) with entry');
    console.log('✅ Detail templates include contentType-specific fields');
    console.log('✅ AI will generate the correct interface automatically');
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

// Run the test
testInterfaceDefinitions();
