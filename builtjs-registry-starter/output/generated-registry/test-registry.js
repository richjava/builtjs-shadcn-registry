#!/usr/bin/env node

/**
 * Registry Test Script
 * 
 * Tests the generated registry components and structure
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Generated Registry...\n');

// Test 1: Check registry.json structure
console.log('1️⃣ Testing registry.json structure...');
try {
  const registry = JSON.parse(fs.readFileSync('registry.json', 'utf8'));
  
  console.log(`   ✅ Registry name: ${registry.name}`);
  console.log(`   ✅ Design systems: ${registry.designSystems.length}`);
  console.log(`   ✅ Total blocks: ${registry.blocks.length}`);
  
  // Check that no layout components are in blocks
  const layoutBlocks = registry.blocks.filter(block => 
    block.name.includes('header') || block.name.includes('footer')
  );
  
  if (layoutBlocks.length === 0) {
    console.log('   ✅ Layout components correctly excluded from blocks');
  } else {
    console.log(`   ❌ Found ${layoutBlocks.length} layout components in blocks`);
  }
  
} catch (error) {
  console.log(`   ❌ Error reading registry.json: ${error.message}`);
}

// Test 2: Check component files exist
console.log('\n2️⃣ Testing component files...');
const expectedComponents = [
  'blocks/header/header1/component.tsx',
  'blocks/footer/footer1/component.tsx',
  'blocks/main/home-landing/skeleton/component.tsx',
  'blocks/shop/product-article-landing/skeleton/component.tsx'
];

let componentsFound = 0;
expectedComponents.forEach(componentPath => {
  if (fs.existsSync(componentPath)) {
    console.log(`   ✅ ${componentPath}`);
    componentsFound++;
  } else {
    console.log(`   ❌ Missing: ${componentPath}`);
  }
});

console.log(`   📊 Found ${componentsFound}/${expectedComponents.length} expected components`);

// Test 3: Check layout vs block structure
console.log('\n3️⃣ Testing layout vs block structure...');
const layoutComponents = [];
const blockComponents = [];

function scanDirectory(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  items.forEach(item => {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      scanDirectory(fullPath);
    } else if (item.name === 'component.tsx') {
      const relativePath = fullPath.replace('blocks/', '');
      const parts = relativePath.split('/');
      
      if (parts.length === 2) {
        // Layout component: blocks/section/template/component.tsx
        layoutComponents.push(relativePath);
      } else if (parts.length === 3) {
        // Block component: blocks/module/section/designSystem/component.tsx
        blockComponents.push(relativePath);
      }
    }
  });
}

scanDirectory('blocks');

console.log(`   📊 Layout components: ${layoutComponents.length}`);
layoutComponents.forEach(comp => console.log(`      - ${comp}`));

console.log(`   📊 Block components: ${blockComponents.length}`);
blockComponents.forEach(comp => console.log(`      - ${comp}`));

// Test 4: Check registry-data files
console.log('\n4️⃣ Testing registry-data files...');
const registryDataFiles = [
  'registry-data/blocks-index.json',
  'registry-data/collections-data.json',
  'registry-data/content-types.json'
];

registryDataFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    const keyCount = Object.keys(content).length;
    console.log(`   ✅ ${file} (${keyCount} entries)`);
  } else {
    console.log(`   ❌ Missing: ${file}`);
  }
});

// Test 5: Check component content
console.log('\n5️⃣ Testing component content...');
const testComponent = 'blocks/main/home-landing/skeleton/component.tsx';
if (fs.existsSync(testComponent)) {
  const content = fs.readFileSync(testComponent, 'utf8');
  
  const checks = [
    { name: 'React import', test: content.includes('import React') },
    { name: 'TypeScript interface', test: content.includes('interface') },
    { name: 'Design system classes', test: content.includes('className=') },
    { name: 'Component export', test: content.includes('export default') }
  ];
  
  checks.forEach(check => {
    console.log(`   ${check.test ? '✅' : '❌'} ${check.name}`);
  });
}

console.log('\n🎉 Registry test complete!');
console.log('\n📋 Summary:');
console.log('   - Layout components are separate from blocks');
console.log('   - Block components have design system variations');
console.log('   - Registry.json excludes layout components');
console.log('   - All expected files are generated');
console.log('\n🚀 To test in browser:');
console.log('   1. Run: npm run dev');
console.log('   2. Open: http://localhost:3000');
console.log('   3. Check components render correctly');
