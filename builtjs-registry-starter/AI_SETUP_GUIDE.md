# AI-Powered Component Generation Setup

## 🤖 OpenAI API Integration

The generator now supports AI-powered component generation using OpenAI's GPT-4 model. This creates more sophisticated, context-aware components compared to template-based generation.

## 📋 Setup Instructions

### 1. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables
Create a `.env` file in the root of your starter project:

```bash
# .env file
OPENAI_API_KEY=your_actual_api_key_here

# Optional: Customize AI behavior
OPENAI_MODEL=gpt-4
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=4000
```

### 3. Install Dependencies
```bash
cd generator
npm install
```

## 🚀 Usage

### With AI (Recommended)
1. Add your OpenAI API key to `.env`
2. Run the generator: `node generator/index.js`
3. Components will be generated using AI with sophisticated styling and functionality

### Without AI (Fallback)
1. Run the generator without API key: `node generator/index.js`
2. Components will be generated using template-based approach
3. Still functional but less sophisticated

## 🎯 AI-Generated Features

When AI is enabled, components will include:

- **Sophisticated Styling**: Design system-specific CSS classes and layouts
- **Responsive Design**: Mobile-first, responsive layouts
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Rich Interactions**: Hover effects, animations, and micro-interactions
- **Context-Aware Content**: Components tailored to your specific data and collections
- **Modern Patterns**: Latest React and TypeScript best practices

## 🔧 AI Prompt Engineering

The AI service uses carefully crafted prompts that include:

- **Component Context**: Section type, template category, design system
- **Data Structure**: Your section data and collection schemas
- **Design Guidelines**: Specific styling rules for each design system
- **Best Practices**: ShadCN UI patterns, accessibility standards, responsive design

## 📊 Design System Support

AI generation supports all design systems with specific guidelines:

- **Skeleton**: Minimal styling, focus on structure
- **Standard**: Professional, clean design
- **Minimal**: Ultra-clean, typography-focused
- **Bold**: High contrast, vibrant colors
- **Neobrutalism**: Raw aesthetic, thick borders, stark shadows

## 💡 Tips for Better AI Generation

1. **Rich Data**: Provide detailed section data in your configuration
2. **Clear Descriptions**: Use descriptive section titles and descriptions
3. **Collection Examples**: Include sample data in your collections
4. **Template Categories**: Use appropriate template categories (covers, cards, lists, etc.)

## 🔄 Fallback Behavior

If AI generation fails for any reason:
- The generator automatically falls back to template-based generation
- No interruption to the build process
- Clear logging of what happened

## 💰 Cost Considerations

- AI generation uses GPT-4 (more expensive but higher quality)
- Each component generation costs approximately $0.01-0.03
- For a typical registry with 20 components, expect $0.20-0.60 total cost
- Template-based generation is free

## 🛠️ Troubleshooting

### API Key Issues
- Ensure `.env` file is in the correct location (project root)
- Verify API key is valid and has sufficient credits
- Check OpenAI API status

### Generation Failures
- Check console output for specific error messages
- Verify internet connection
- Ensure OpenAI account has API access enabled

### Quality Issues
- Try adjusting `OPENAI_TEMPERATURE` (0.3 for more consistent, 0.9 for more creative)
- Provide more detailed section descriptions
- Include more sample data in collections
