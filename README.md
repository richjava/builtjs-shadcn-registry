# BuiltJS Shadcn Registry

A comprehensive shadcn/ui registry featuring reusable React templates and blocks for building modern web applications.

## 🚀 Features

- **19 Template Categories**: From headers and footers to pricing and landing pages
- **Shadcn/ui Compatible**: Fully compatible with shadcn/ui component system
- **TypeScript Ready**: Built with TypeScript for better developer experience
- **Responsive Design**: All templates are mobile-first and fully responsive
- **Modern Stack**: Next.js 14, Tailwind CSS, and Radix UI primitives

## 📦 Template Categories

- **About Landing** - About us page sections
- **Banner** - Promotional and announcement banners
- **Blog** - Blog listing and content sections
- **Blog Article** - Individual blog post layouts
- **Call to Action** - CTA sections and components
- **FAQ** - Frequently asked questions sections
- **Features** - Feature showcases
- **Features List** - Traditional feature listing sections
- **Footer** - Website footer components
- **Gallery** - Image and media galleries
- **Main Landing** - Hero sections and landing page components
- **Newsletter** - Newsletter signup components
- **List** - Various list layouts and components
- **Logos** - Logo showcases and partner sections
- **Header** - Navigation and header components
- **Pricing** - Pricing tables and subscription sections
- **Services** - Service showcase sections
- **Services List** - Service listing components
- **Team** - Team member showcases

## 🛠️ Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/builtjs-shadcn-registry.git
cd builtjs-shadcn-registry
```

2. Install dependencies:
```bash
npm install
```

3. Build the registry:
```bash
npm run build
```

4. Start the development server:
```bash
npm run dev
```

### Using Templates

You can use these templates in your shadcn/ui project by adding this registry:

```bash
npx shadcn-ui@latest add --registry https://your-registry-url.vercel.app
```

Or copy individual components directly from the registry.

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
├── blocks/                 # Template blocks organized by category
│   ├── header/
│   ├── footer/
│   ├── pricing/
│   └── ...
├── components/ui/          # Base shadcn/ui components
├── lib/                    # Utility functions
├── scripts/                # Build scripts
├── public/registry/        # Generated registry files
└── registry.json          # Registry configuration
```

## 📝 Adding New Templates

1. Create a new directory in the appropriate category under `blocks/`:
```bash
mkdir blocks/header/new-header-template
```

2. Add your template files:
- `component.tsx` - The main component
- `block.json` - Configuration and metadata

3. Run the build script to update the registry:
```bash
npm run build
```

### Template Configuration

Each template should include a `block.json` file:

```json
{
  "name": "template-name",
  "description": "Template description",
  "dependencies": ["lucide-react"],
  "registryDependencies": ["button", "card"],
  "tailwind": {
    "config": {
      "theme": {
        "extend": {}
      }
    }
  }
}
```

To build the registry:
```
npm run build:registry
```

## 🚀 Deployment

The registry is designed to be deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with the provided configuration

The registry will be available at your Vercel URL and can be used with the shadcn/ui CLI.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component system
- [Radix UI](https://www.radix-ui.com/) for the primitive components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
