/**
 * AI Prompt Debugger
 * 
 * Debug tool to inspect and modify AI prompts before sending to OpenAI
 */

const AIComponentService = require('./generator/services/ai-component-service');
const path = require('path');

class AIPromptDebugger {
  constructor() {
    this.aiService = new AIComponentService();
  }

  async debugPrompt(section, template, designSystem, collections = {}) {
    console.log('🔍 AI Prompt Debugger');
    console.log('=' .repeat(50));
    
    // Build the prompt using the same method as the AI service
    const prompt = this.aiService.buildComponentPrompt(section, template, designSystem, collections);
    const systemPrompt = this.aiService.getSystemPrompt();
    
    console.log('\n📋 SYSTEM PROMPT:');
    console.log('-'.repeat(30));
    console.log(systemPrompt);
    
    console.log('\n📝 USER PROMPT:');
    console.log('-'.repeat(30));
    console.log(prompt);
    
    console.log('\n📊 PROMPT METADATA:');
    console.log('-'.repeat(30));
    console.log(`Section: ${section.title} (${section.name})`);
    console.log(`Template: ${template.title} (${template.category})`);
    console.log(`Design System: ${designSystem.name} (${designSystem.description ? designSystem.description.substring(0, 50) + '...' : 'No description'})`);
    console.log(`Collections: ${Object.keys(collections).join(', ') || 'None'}`);
    console.log(`Section Data Keys: ${Object.keys(section.data || {}).join(', ') || 'None'}`);
    
    console.log('\n🎯 DESIGN SYSTEM GUIDELINES:');
    console.log('-'.repeat(30));
    console.log(`- Design System: ${designSystem.name}`);
    console.log(`- Description: ${designSystem.description}`);
    
    console.log('\n📂 CATEGORY GUIDELINES:');
    console.log('-'.repeat(30));
    console.log(this.aiService.getCategoryGuidelines(template.category));
    
    console.log('\n📦 COLLECTIONS DATA:');
    console.log('-'.repeat(30));
    Object.entries(collections).forEach(([name, data]) => {
      console.log(`${name}: ${data.length} items`);
      if (data.length > 0) {
        console.log(`  Sample: ${JSON.stringify(data[0], null, 2).substring(0, 200)}...`);
      }
    });
    
    console.log('\n📄 SECTION DATA:');
    console.log('-'.repeat(30));
    console.log(JSON.stringify(section.data || {}, null, 2));
    
    console.log('\n' + '='.repeat(50));
    
    return { systemPrompt, prompt };
  }

  async testPromptWithAI(section, template, designSystem, collections = {}) {
    console.log('🤖 Testing Prompt with AI...');
    
    try {
      // Initialize AI service
      const aiEnabled = await this.aiService.initialize();
      
      if (!aiEnabled) {
        console.log('❌ AI not available. Add OPENAI_API_KEY to .env file to test.');
        return null;
      }
      
      // Generate component using AI
      const componentCode = await this.aiService.generateComponent(
        section, 
        template, 
        designSystem, 
        collections
      );
      
      console.log('\n✅ AI GENERATED COMPONENT:');
      console.log('-'.repeat(30));
      console.log(componentCode);
      
      return componentCode;
      
    } catch (error) {
      console.log(`❌ AI Generation failed: ${error.message}`);
      return null;
    }
  }

  async debugAndTest(section, template, designSystem, collections = {}) {
    // First, show the prompt
    await this.debugPrompt(section, template, designSystem, collections);
    
    // Then test with AI if available
    console.log('\n🤖 Testing with AI...');
    await this.testPromptWithAI(section, template, designSystem, collections);
  }
}

module.exports = AIPromptDebugger;
