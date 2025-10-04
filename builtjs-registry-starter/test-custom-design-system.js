#!/usr/bin/env node

/**
 * Test Custom Design System Prompt
 * 
 * Shows how the AI prompt uses custom design system name and description
 */

const AIPromptDebugger = require('./debug-ai-prompt');

async function testCustomDesignSystem() {
  console.log('🔍 Testing Custom Design System Prompt');
  console.log('=' .repeat(60));
  
  // Create a custom design system
  const customDesignSystem = {
    name: "cyberpunk",
    label: "Cyberpunk",
    description: "Futuristic neon aesthetics with dark backgrounds, glowing accents, and high-tech visual elements. Use vibrant neon colors, dark themes, and sci-fi inspired design patterns."
  };
  
  // Create a sample section
  const section = {
    name: "homeLanding",
    title: "Home Landing",
    type: "body",
    data: {
      heading: "Welcome to the Future",
      blurb: "Experience cutting-edge technology and innovation"
    },
    collections: {}
  };
  
  // Create a sample template
  const template = {
    name: "cover1",
    title: "Cover 1",
    category: "covers"
  };
  
  // Create debugger and show the prompt
  const promptDebugger = new AIPromptDebugger();
  await promptDebugger.debugPrompt(section, template, customDesignSystem, {});
  
  console.log('\n💡 CUSTOM DESIGN SYSTEM ANALYSIS:');
  console.log('-'.repeat(30));
  console.log('Notice how the prompt now uses:');
  console.log(`- Design System: ${customDesignSystem.name}`);
  console.log(`- Description: ${customDesignSystem.description}`);
  console.log('- Plus fallback guidelines for "cyberpunk" design system');
}

// Run the test
testCustomDesignSystem();
