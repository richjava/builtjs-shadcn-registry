const fs = require('fs');
const path = require('path');
const registryPath = path.join(process.cwd(), 'registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

// Simulate the category page logic
const name = 'main';
const blocks = (registry.blocks || []).filter((b) => b.moduleName.toLowerCase() === name);
console.log('Blocks for main module:', blocks.length);

// Group blocks by section
const sectionsMap = new Map();
blocks.forEach((block) => {
  if (block.sectionName) {
    const sectionKey = block.sectionName.toLowerCase().replace(/\s+/g, '-');
    if (!sectionsMap.has(sectionKey)) {
      sectionsMap.set(sectionKey, []);
    }
    sectionsMap.get(sectionKey).push(block);
  }
});

console.log('Sections found:');
sectionsMap.forEach((templates, sectionKey) => {
  console.log('- ' + sectionKey + ': ' + templates.length + ' templates');
});
