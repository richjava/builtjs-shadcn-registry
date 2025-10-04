/**
 * Configuration Parser
 * 
 * Parses Built.js theme configuration files and converts them
 * to a unified format for registry generation.
 */

const fs = require('fs').promises;
const path = require('path');

class ConfigParser {
  constructor(configPath) {
    this.configPath = configPath;
  }

  async parse() {
    console.log(`📂 Reading configuration from: ${this.configPath}`);
    
    const config = {
      theme: null,
      global: null,
      modules: [],
      sections: [],
      templates: [],
      contentTypes: [],
      collections: {},
      plugins: []
    };

    try {
      // Parse main configuration files
      config.theme = await this.parseJsonFileWithExtraction('theme.json');
      config.global = await this.parseJsonFileWithExtraction('global.json');
      config.modules = await this.parseJsonFileWithExtraction('modules.json');
      config.sections = await this.parseJsonFileWithExtraction('sections.json');
      config.templates = await this.parseJsonFileWithExtraction('templates.json');
      config.contentTypes = await this.parseJsonFileWithExtraction('schemas/content-types.json');
      
      // Parse collections
      config.collections = await this.parseCollections();
      
      // Parse plugins
      config.plugins = await this.parsePlugins();
      
      // Validate configuration
      this.validateConfig(config);
      
      console.log('✅ Configuration parsed successfully');
      console.log(`📊 Found: ${config.sections.length} sections, ${config.templates.length} templates, ${Object.keys(config.collections).length} collections`);
      
      return config;
      
    } catch (error) {
      console.error('❌ Configuration parsing failed:', error.message);
      throw error;
    }
  }

  async parseJsonFile(filename) {
    const filePath = path.join(this.configPath, filename);
    try {
      const content = await fs.readFile(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.warn(`⚠️ File not found: ${filename}`);
        return null;
      }
      throw error;
    }
  }

  async parseJsonFileWithExtraction(filename) {
    const data = await this.parseJsonFile(filename);
    if (!data) return null;
    
    // Extract the main data based on filename
    switch (filename) {
      case 'theme.json':
        return data.theme;
      case 'global.json':
        return data.global;
      case 'modules.json':
        return data.modules || [];
      case 'sections.json':
        return data.sections || [];
      case 'templates.json':
        return data.templates || [];
      case 'schemas/content-types.json':
        return data.contentTypes;
      default:
        return data;
    }
  }

  async parseCollections() {
    const collectionsDir = path.join(this.configPath, 'collections');
    const collections = {};
    
    try {
      const files = await fs.readdir(collectionsDir);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const collectionName = path.basename(file, '.json');
          const filePath = path.join(collectionsDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          const data = JSON.parse(content);
          collections[collectionName] = data.data || [];
        }
      }
    } catch (error) {
      console.warn('⚠️ Could not parse collections:', error.message);
    }
    
    return collections;
  }

  async parsePlugins() {
    const pluginsDir = path.join(this.configPath, 'plugins');
    const plugins = [];
    
    try {
      const pluginDirs = await fs.readdir(pluginsDir);
      
      for (const pluginDir of pluginDirs) {
        const pluginPath = path.join(pluginsDir, pluginDir);
        const stat = await fs.stat(pluginPath);
        
        if (stat.isDirectory()) {
          const plugin = await this.parsePlugin(pluginPath, pluginDir);
          if (plugin) {
            plugins.push(plugin);
          }
        }
      }
    } catch (error) {
      console.warn('⚠️ Could not parse plugins:', error.message);
    }
    
    return plugins;
  }

  async parsePlugin(pluginPath, pluginName) {
    try {
      const pluginConfig = await this.parseJsonFile(path.join(pluginPath, 'plugin.json'));
      const sectionsData = await this.parseJsonFile(path.join(pluginPath, 'sections.json'));
      const templatesData = await this.parseJsonFile(path.join(pluginPath, 'templates.json'));
      const contentTypesData = await this.parseJsonFile(path.join(pluginPath, 'schemas/content-types.json'));
      
      const sections = sectionsData?.sections || [];
      const templates = templatesData?.templates || [];
      const contentTypes = contentTypesData?.contentTypes || [];
      
      // Parse plugin collections
      const collections = {};
      try {
        const collectionsDir = path.join(pluginPath, 'collections');
        const files = await fs.readdir(collectionsDir);
        
        for (const file of files) {
          if (file.endsWith('.json')) {
            const collectionName = path.basename(file, '.json');
            const filePath = path.join(collectionsDir, file);
            const content = await fs.readFile(filePath, 'utf8');
            const data = JSON.parse(content);
            collections[collectionName] = data.data || [];
          }
        }
      } catch (error) {
        // Collections directory might not exist
      }
      
      return {
        name: pluginName,
        config: pluginConfig?.plugin || {},
        sections: sections || [],
        templates: templates || [],
        contentTypes: contentTypes || [],
        collections
      };
    } catch (error) {
      console.warn(`⚠️ Could not parse plugin ${pluginName}:`, error.message);
      return null;
    }
  }

  validateConfig(config) {
    const errors = [];
    
    if (!config.theme) {
      errors.push('Theme configuration is required');
    }
    
    if (!config.sections || config.sections.length === 0) {
      errors.push('At least one section is required');
    }
    
    if (!config.templates || config.templates.length === 0) {
      errors.push('At least one template is required');
    }
    
    // Validate section-template relationships
    for (const section of config.sections) {
      if (!section.templates || section.templates.length === 0) {
        errors.push(`Section "${section.name}" must have at least one template`);
      }
      
      // Check if templates exist
      for (const templateName of section.templates) {
        const template = config.templates.find(t => t.name === templateName);
        if (!template) {
          errors.push(`Template "${templateName}" referenced in section "${section.name}" does not exist`);
        }
      }
    }
    
    if (errors.length > 0) {
      throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
    }
  }

  // Helper method to parse JSON files with error handling
  async parseJsonFile(filename) {
    const filePath = path.join(this.configPath, filename);
    try {
      const content = await fs.readFile(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.warn(`⚠️ File not found: ${filename}`);
        return null;
      }
      throw error;
    }
  }
}

module.exports = ConfigParser;
