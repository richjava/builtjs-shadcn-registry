/**
 * Utility functions for generating slugs from human-readable names
 */

/**
 * Converts a human-readable name to a URL-friendly slug
 * @param name - The human-readable name (e.g., "Company Story")
 * @returns The slug (e.g., "company-story")
 */
export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

/**
 * Generates a block slug from component parts
 * @param moduleName - The module name (e.g., "About")
 * @param sectionName - The section name (e.g., "Values") 
 * @param themeName - The theme name (e.g., "Minimal")
 * @param templateName - The template name (e.g., "Grid") - not used in slug
 * @returns The complete block slug (e.g., "about-values-minimal")
 */
export function generateBlockSlug(
  moduleName: string,
  sectionName: string,
  themeName: string,
  templateName: string
): string {
  const moduleSlug = nameToSlug(moduleName)
  const sectionSlug = nameToSlug(sectionName)
  const themeSlug = nameToSlug(themeName)
  
  return `${moduleSlug}-${sectionSlug}-${themeSlug}`
}

/**
 * Generates a section slug from module and section names
 * @param moduleName - The module name (e.g., "About")
 * @param sectionName - The section name (e.g., "Values")
 * @returns The section slug (e.g., "about-values")
 */
export function generateSectionSlug(moduleName: string, sectionName: string): string {
  const moduleSlug = nameToSlug(moduleName)
  const sectionSlug = nameToSlug(sectionName)
  
  return `${moduleSlug}-${sectionSlug}`
}

/**
 * Generates a template slug from theme and template names
 * @param themeName - The theme name (e.g., "Minimal")
 * @param templateName - The template name (e.g., "Grid")
 * @returns The template slug (e.g., "minimal-grid")
 */
export function generateTemplateSlug(themeName: string, templateName: string): string {
  const themeSlug = nameToSlug(themeName)
  const templateSlug = nameToSlug(templateName)
  
  return `${themeSlug}-${templateSlug}`
}

/**
 * Parses a block slug back into its component parts
 * @param blockSlug - The block slug (e.g., "about-values-minimal")
 * @returns Object with parsed components or null if invalid format
 */
export function parseBlockSlug(blockSlug: string): {
  moduleName: string
  sectionName: string
  themeName: string
  templateName: string
} | null {
  const parts = blockSlug.split('-')
  if (parts.length < 3) {
    return null
  }
  
  // Find the theme by looking for known theme names at the end
  const themes = ['standard', 'minimal', 'bold']
  const lastPart = parts[parts.length - 1]
  
  if (!themes.includes(lastPart)) {
    return null
  }
  
  const themeIndex = parts.length - 1
  const moduleParts = parts.slice(0, themeIndex - 1)
  const sectionParts = parts.slice(themeIndex - 1, themeIndex)
  const themeParts = parts.slice(themeIndex, themeIndex + 1)
  
  return {
    moduleName: moduleParts.join(' ').replace(/\b\w/g, l => l.toUpperCase()),
    sectionName: sectionParts.join(' ').replace(/\b\w/g, l => l.toUpperCase()),
    themeName: themeParts.join(' ').replace(/\b\w/g, l => l.toUpperCase()),
    templateName: '' // Template name is not part of the slug anymore
  }
}
