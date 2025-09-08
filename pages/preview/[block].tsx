import { useRouter } from 'next/router'
import fs from 'fs'
import path from 'path'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Code } from 'lucide-react'
import Header from '@/components/header'
import TemplateNavigation from '@/components/template-navigation'

// Import all block components
import AboutLandingImage from '@/blocks/about/about-landing/image/component'
import AboutLandingMinimalImage from '@/blocks/about/about-landing/minimal-image/component'
import AboutLandingBoldImage from '@/blocks/about/about-landing/bold-image/component'
import AboutLandingStats from '@/blocks/about/about-landing/stats/component'
import AboutLandingMinimalStats from '@/blocks/about/about-landing/minimal-stats/component'
import AboutLandingBoldStats from '@/blocks/about/about-landing/bold-stats/component'
import AboutCompanyStoryNarrative from '@/blocks/about/about-company-story/narrative/component'
import AboutCompanyStoryMinimalNarrative from '@/blocks/about/about-company-story/minimal-narrative/component'
import AboutCompanyStoryBoldNarrative from '@/blocks/about/about-company-story/bold-narrative/component'
import AboutValuesGrid from '@/blocks/about/about-values/grid/component'
import AboutValuesMinimalGrid from '@/blocks/about/about-values/minimal-grid/component'
import AboutValuesBoldGrid from '@/blocks/about/about-values/bold-grid/component'
import AboutTeamCards from '@/blocks/about/about-team/cards/component'
import AboutTeamMinimalCards from '@/blocks/about/about-team/minimal-cards/component'
import AboutTeamBoldCards from '@/blocks/about/about-team/bold-cards/component'
import AboutMissionStatement from '@/blocks/about/about-mission/statement/component'
import AboutMissionMinimalStatement from '@/blocks/about/about-mission/minimal-statement/component'
import AboutMissionBoldStatement from '@/blocks/about/about-mission/bold-statement/component'
import SimpleNav from '@/blocks/header/simple-nav/component'
import HeroSection from '@/blocks/main-landing/hero-section/component'
import MainHeroSectionStandard from '@/blocks/main/hero-section/standard/component'
import MainHeroSectionMinimal from '@/blocks/main/hero-section/minimal/component'
import MainHeroSectionBold from '@/blocks/main/hero-section/bold/component'
import ValuePropositionStandard from '@/blocks/main/value-proposition/standard/component'
import ValuePropositionMinimal from '@/blocks/main/value-proposition/minimal/component'
import ValuePropositionBold from '@/blocks/main/value-proposition/bold/component'
import SocialProofStandard from '@/blocks/main/social-proof/standard/component'
import SocialProofMinimal from '@/blocks/main/social-proof/minimal/component'
import SocialProofBold from '@/blocks/main/social-proof/bold/component'
import CallToActionStandard from '@/blocks/main/call-to-action/standard/component'
import CallToActionMinimal from '@/blocks/main/call-to-action/minimal/component'
import CallToActionBold from '@/blocks/main/call-to-action/bold/component'
import TrustIndicatorsStandard from '@/blocks/main/trust-indicators/standard/component'
import TrustIndicatorsMinimal from '@/blocks/main/trust-indicators/minimal/component'
import TrustIndicatorsBold from '@/blocks/main/trust-indicators/bold/component'
import ProblemSolutionStandard from '@/blocks/main/problem-solution/standard/component'
import ProblemSolutionMinimal from '@/blocks/main/problem-solution/minimal/component'
import ProblemSolutionBold from '@/blocks/main/problem-solution/bold/component'
import ContactLeadGenerationStandard from '@/blocks/main/contact-lead-generation/standard/component'
import ContactLeadGenerationMinimal from '@/blocks/main/contact-lead-generation/minimal/component'
import ContactLeadGenerationBold from '@/blocks/main/contact-lead-generation/bold/component'
import FeaturesShowcase from '@/blocks/features/showcase/standard/component'
import FeaturesShowcaseMinimal from '@/blocks/features/showcase/minimal/component'
import FeaturesShowcaseBold from '@/blocks/features/showcase/bold/component'
import FeaturesHighlights from '@/blocks/features/highlights/standard/component'
import FeaturesHighlightsMinimal from '@/blocks/features/highlights/minimal/component'
import FeaturesHighlightsBold from '@/blocks/features/highlights/bold/component'
import FeaturesCapabilities from '@/blocks/features/capabilities/standard/component'
import FeaturesCapabilitiesMinimal from '@/blocks/features/capabilities/minimal/component'
import FeaturesCapabilitiesBold from '@/blocks/features/capabilities/bold/component'
import ServicesOfferings from '@/blocks/services/offerings/standard/component'
import ServicesSolutions from '@/blocks/services/solutions/standard/component'
import ServicesServices from '@/blocks/services/services/standard/component'
import ServicesOfferingsMinimal from '@/blocks/services/offerings/minimal/component'
import ServicesOfferingsBold from '@/blocks/services/offerings/bold/component'
import ServicesServicesMinimal from '@/blocks/services/services/minimal/component'
import ServicesServicesBold from '@/blocks/services/services/bold/component'
import ServicesSolutionsMinimal from '@/blocks/services/solutions/minimal/component'
import ServicesSolutionsBold from '@/blocks/services/solutions/bold/component'
import TeamProfiles from '@/blocks/team/profiles/standard/component'
import TeamCulture from '@/blocks/team/culture/standard/component'
import TeamMembers from '@/blocks/team/members/standard/component'
import TeamCultureMinimal from '@/blocks/team/culture/minimal/component'
import TeamCultureBold from '@/blocks/team/culture/bold/component'
import TeamMembersMinimal from '@/blocks/team/members/minimal/component'
import TeamMembersBold from '@/blocks/team/members/bold/component'
import TeamProfilesMinimal from '@/blocks/team/profiles/minimal/component'
import TeamProfilesBold from '@/blocks/team/profiles/bold/component'
import FeatureGrid from '@/blocks/features-list/feature-grid/component'
import SimpleFooter from '@/blocks/footer/simple-footer/component'
import PricingCards from '@/blocks/pricing/pricing-cards/component'

// FAQ Components
import FAQQuestionsStandard from '@/blocks/faq/questions/standard/component'
import FAQQuestionsMinimal from '@/blocks/faq/questions/minimal/component'
import FAQQuestionsBold from '@/blocks/faq/questions/bold/component'
import FAQHelpStandard from '@/blocks/faq/help/standard/component'
import FAQHelpMinimal from '@/blocks/faq/help/minimal/component'
import FAQHelpBold from '@/blocks/faq/help/bold/component'
import FAQSupportStandard from '@/blocks/faq/support/standard/component'
import FAQSupportMinimal from '@/blocks/faq/support/minimal/component'
import FAQSupportBold from '@/blocks/faq/support/bold/component'

// Logos Components
import LogosClientsStandard from '@/blocks/logos/clients/standard/component'
import LogosClientsMinimal from '@/blocks/logos/clients/minimal/component'
import LogosClientsBold from '@/blocks/logos/clients/bold/component'
import LogosPartnersStandard from '@/blocks/logos/partners/standard/component'
import LogosPartnersMinimal from '@/blocks/logos/partners/minimal/component'
import LogosPartnersBold from '@/blocks/logos/partners/bold/component'
import LogosBrandsStandard from '@/blocks/logos/brands/standard/component'
import LogosBrandsMinimal from '@/blocks/logos/brands/minimal/component'
import LogosBrandsBold from '@/blocks/logos/brands/bold/component'

// Newsletter Components
import NewsletterSignupStandard from '@/blocks/newsletter/signup/standard/component'
import NewsletterSignupMinimal from '@/blocks/newsletter/signup/minimal/component'
import NewsletterSignupBold from '@/blocks/newsletter/signup/bold/component'
import NewsletterSubscriptionStandard from '@/blocks/newsletter/subscription/standard/component'
import NewsletterSubscriptionMinimal from '@/blocks/newsletter/subscription/minimal/component'
import NewsletterSubscriptionBold from '@/blocks/newsletter/subscription/bold/component'
import NewsletterOptInStandard from '@/blocks/newsletter/opt-in/standard/component'
import NewsletterOptInMinimal from '@/blocks/newsletter/opt-in/minimal/component'
import NewsletterOptInBold from '@/blocks/newsletter/opt-in/bold/component'

// Blog Components
import BlogArticleStandard from '@/blocks/blog/blog-article/standard/component'
import BlogArticleMinimal from '@/blocks/blog/blog-article/minimal/component'
import BlogArticleBold from '@/blocks/blog/blog-article/bold/component'
import BlogPostsStandard from '@/blocks/blog/blog-posts/standard/component'
import BlogPostsMinimal from '@/blocks/blog/blog-posts/minimal/component'
import BlogPostsBold from '@/blocks/blog/blog-posts/bold/component'
import FeaturedPostsStandard from '@/blocks/blog/featured-posts/standard/component'
import FeaturedPostsMinimal from '@/blocks/blog/featured-posts/minimal/component'
import FeaturedPostsBold from '@/blocks/blog/featured-posts/bold/component'

// Gallery Components
import GalleryPortfolioStandard from '@/blocks/gallery/portfolio/standard/component'
import GalleryPortfolioMinimal from '@/blocks/gallery/portfolio/minimal/component'
import GalleryPortfolioBold from '@/blocks/gallery/portfolio/bold/component'
import GalleryProductsStandard from '@/blocks/gallery/products/standard/component'
import GalleryProductsMinimal from '@/blocks/gallery/products/minimal/component'
import GalleryProductsBold from '@/blocks/gallery/products/bold/component'
import GalleryShowcaseStandard from '@/blocks/gallery/showcase/standard/component'
import GalleryShowcaseMinimal from '@/blocks/gallery/showcase/minimal/component'
import GalleryShowcaseBold from '@/blocks/gallery/showcase/bold/component'

// Pricing Components
import PricingPlansStandard from '@/blocks/pricing/plans/standard/component'
import PricingPlansMinimal from '@/blocks/pricing/plans/minimal/component'
import PricingPlansBold from '@/blocks/pricing/plans/bold/component'
import PricingTablesStandard from '@/blocks/pricing/tables/standard/component'
import PricingTablesMinimal from '@/blocks/pricing/tables/minimal/component'
import PricingTablesBold from '@/blocks/pricing/tables/bold/component'
import PricingSubscriptionStandard from '@/blocks/pricing/subscription/standard/component'
import PricingSubscriptionMinimal from '@/blocks/pricing/subscription/minimal/component'
import PricingSubscriptionBold from '@/blocks/pricing/subscription/bold/component'

const blockComponents: Record<string, React.ComponentType<any>> = {
  'about-about-landing-image': AboutLandingImage,
  'about-about-landing-minimal-image': AboutLandingMinimalImage,
  'about-about-landing-bold-image': AboutLandingBoldImage,
  'about-about-landing-stats': AboutLandingStats,
  'about-about-landing-minimal-stats': AboutLandingMinimalStats,
  'about-about-landing-bold-stats': AboutLandingBoldStats,
  'about-about-company-story-narrative': AboutCompanyStoryNarrative,
  'about-about-company-story-minimal-narrative': AboutCompanyStoryMinimalNarrative,
  'about-about-company-story-bold-narrative': AboutCompanyStoryBoldNarrative,
  'about-about-values-grid': AboutValuesGrid,
  'about-about-values-minimal-grid': AboutValuesMinimalGrid,
  'about-about-values-bold-grid': AboutValuesBoldGrid,
  'about-about-team-cards': AboutTeamCards,
  'about-about-team-minimal-cards': AboutTeamMinimalCards,
  'about-about-team-bold-cards': AboutTeamBoldCards,
  'about-about-mission-statement': AboutMissionStatement,
  'about-about-mission-minimal-statement': AboutMissionMinimalStatement,
  'about-about-mission-bold-statement': AboutMissionBoldStatement,
  'header-simple-nav': SimpleNav,
  'main-landing-hero-section': HeroSection,
  'main-hero-section-standard': MainHeroSectionStandard,
  'main-hero-section-minimal': MainHeroSectionMinimal,
  'main-hero-section-bold': MainHeroSectionBold,
  'main-value-proposition-standard': ValuePropositionStandard,
  'main-value-proposition-minimal': ValuePropositionMinimal,
  'main-value-proposition-bold': ValuePropositionBold,
  'main-social-proof-standard': SocialProofStandard,
  'main-social-proof-minimal': SocialProofMinimal,
  'main-social-proof-bold': SocialProofBold,
  'main-call-to-action-standard': CallToActionStandard,
  'main-call-to-action-minimal': CallToActionMinimal,
  'main-call-to-action-bold': CallToActionBold,
  'main-trust-indicators-standard': TrustIndicatorsStandard,
  'main-trust-indicators-minimal': TrustIndicatorsMinimal,
  'main-trust-indicators-bold': TrustIndicatorsBold,
  'main-problem-solution-standard': ProblemSolutionStandard,
  'main-problem-solution-minimal': ProblemSolutionMinimal,
  'main-problem-solution-bold': ProblemSolutionBold,
  'main-contact-lead-generation-standard': ContactLeadGenerationStandard,
  'main-contact-lead-generation-minimal': ContactLeadGenerationMinimal,
  'main-contact-lead-generation-bold': ContactLeadGenerationBold,
  'features-showcase-standard': FeaturesShowcase,
  'features-showcase-minimal': FeaturesShowcaseMinimal,
  'features-showcase-bold': FeaturesShowcaseBold,
  'features-highlights-standard': FeaturesHighlights,
  'features-highlights-minimal': FeaturesHighlightsMinimal,
  'features-highlights-bold': FeaturesHighlightsBold,
  'features-capabilities-standard': FeaturesCapabilities,
  'features-capabilities-minimal': FeaturesCapabilitiesMinimal,
  'features-capabilities-bold': FeaturesCapabilitiesBold,
  'services-offerings-standard': ServicesOfferings,
  'services-offerings-minimal': ServicesOfferingsMinimal,
  'services-offerings-bold': ServicesOfferingsBold,
  'services-solutions-standard': ServicesSolutions,
  'services-solutions-minimal': ServicesSolutionsMinimal,
  'services-solutions-bold': ServicesSolutionsBold,
  'services-services-standard': ServicesServices,
  'services-services-minimal': ServicesServicesMinimal,
  'services-services-bold': ServicesServicesBold,
  'features-list-feature-grid': FeatureGrid,
  'footer-simple-footer': SimpleFooter,
  'pricing-pricing-cards': PricingCards,
  'team-profiles-standard': TeamProfiles,
  'team-profiles-minimal': TeamProfilesMinimal,
  'team-profiles-bold': TeamProfilesBold,
  'team-culture-standard': TeamCulture,
  'team-culture-minimal': TeamCultureMinimal,
  'team-culture-bold': TeamCultureBold,
  'team-members-standard': TeamMembers,
  'team-members-minimal': TeamMembersMinimal,
  'team-members-bold': TeamMembersBold,
  'faq-questions-standard': FAQQuestionsStandard,
  'faq-questions-minimal': FAQQuestionsMinimal,
  'faq-questions-bold': FAQQuestionsBold,
  'faq-help-standard': FAQHelpStandard,
  'faq-help-minimal': FAQHelpMinimal,
  'faq-help-bold': FAQHelpBold,
  'faq-support-standard': FAQSupportStandard,
  'faq-support-minimal': FAQSupportMinimal,
  'faq-support-bold': FAQSupportBold,
  'logos-clients-standard': LogosClientsStandard,
  'logos-clients-minimal': LogosClientsMinimal,
  'logos-clients-bold': LogosClientsBold,
  'logos-partners-standard': LogosPartnersStandard,
  'logos-partners-minimal': LogosPartnersMinimal,
  'logos-partners-bold': LogosPartnersBold,
  'logos-brands-standard': LogosBrandsStandard,
  'logos-brands-minimal': LogosBrandsMinimal,
  'logos-brands-bold': LogosBrandsBold,
  'newsletter-signup-standard': NewsletterSignupStandard,
  'newsletter-signup-minimal': NewsletterSignupMinimal,
  'newsletter-signup-bold': NewsletterSignupBold,
  'newsletter-subscription-standard': NewsletterSubscriptionStandard,
  'newsletter-subscription-minimal': NewsletterSubscriptionMinimal,
  'newsletter-subscription-bold': NewsletterSubscriptionBold,
  'newsletter-opt-in-standard': NewsletterOptInStandard,
  'newsletter-opt-in-minimal': NewsletterOptInMinimal,
  'newsletter-opt-in-bold': NewsletterOptInBold,
  'blog-blog-article-standard': BlogArticleStandard,
  'blog-blog-article-minimal': BlogArticleMinimal,
  'blog-blog-article-bold': BlogArticleBold,
  'blog-blog-posts-standard': BlogPostsStandard,
  'blog-blog-posts-minimal': BlogPostsMinimal,
  'blog-blog-posts-bold': BlogPostsBold,
  'blog-featured-posts-standard': FeaturedPostsStandard,
  'blog-featured-posts-minimal': FeaturedPostsMinimal,
  'blog-featured-posts-bold': FeaturedPostsBold,
  'gallery-portfolio-standard': GalleryPortfolioStandard,
  'gallery-portfolio-minimal': GalleryPortfolioMinimal,
  'gallery-portfolio-bold': GalleryPortfolioBold,
  'gallery-products-standard': GalleryProductsStandard,
  'gallery-products-minimal': GalleryProductsMinimal,
  'gallery-products-bold': GalleryProductsBold,
  'gallery-showcase-standard': GalleryShowcaseStandard,
  'gallery-showcase-minimal': GalleryShowcaseMinimal,
  'gallery-showcase-bold': GalleryShowcaseBold,
  'pricing-plans-standard': PricingPlansStandard,
  'pricing-plans-minimal': PricingPlansMinimal,
  'pricing-plans-bold': PricingPlansBold,
  'pricing-tables-standard': PricingTablesStandard,
  'pricing-tables-minimal': PricingTablesMinimal,
  'pricing-tables-bold': PricingTablesBold,
  'pricing-subscription-standard': PricingSubscriptionStandard,
  'pricing-subscription-minimal': PricingSubscriptionMinimal,
  'pricing-subscription-bold': PricingSubscriptionBold,
}

interface BlockData {
  name: string
  description?: string
  category?: string
  section?: string
  template?: string
  sectionName?: string
  templateName?: string
  themeName?: string
  theme?: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
  fields?: Record<string, string>
  data?: Record<string, any>
  collectionsData?: Record<string, any>
}

interface NavigationTemplate {
  name: string
  templateName?: string
  themeName?: string
}

interface Props {
  block: BlockData
  componentName: string
  navigation?: {
    previous?: NavigationTemplate | null
    next?: NavigationTemplate | null
    currentIndex: number
    totalTemplates: number
  }
}

export default function BlockPreview({ block, componentName, navigation }: Props) {
  const router = useRouter()
  const Component = blockComponents[componentName]
  const isThumbnail = router.query.thumbnail === 'true'

  if (!Component) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The template "{componentName}" could not be loaded.
          </p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Thumbnail mode - just render the component
  if (isThumbnail) {
    return (
      <div className="w-full h-full bg-background">
        <Component content={{ data: block.data, collections: block.collectionsData }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Custom Header for Preview */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/section/${block.category}/${block.section}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Section
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">
                  {block.templateName ? `${block.sectionName} - ${block.templateName}` : block.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {block.category} • {block.themeName || block.theme || 'Standard'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <a href={`/registry/${componentName}.json`} target="_blank">
                  <Code className="mr-2 h-4 w-4" />
                  View JSON
                </a>
              </Button>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Copy Code
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className={`preview-container ${navigation ? 'pb-20' : ''}`}>
        <Component content={{ data: block.data, collections: block.collectionsData }} />
      </div>

      {/* Bottom Navigation */}
      {navigation && (
        <TemplateNavigation
          previous={navigation.previous}
          next={navigation.next}
          currentIndex={navigation.currentIndex}
          totalTemplates={navigation.totalTemplates}
          sectionName={block.sectionName}
        />
      )}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  const paths = (registry.blocks || []).map((block: any) => ({
    params: { block: block.name }
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blockId = params?.block as string
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  const block = (registry.blocks || []).find((b: any) => b.name === blockId)
  
  if (!block) {
    return { notFound: true }
  }

  // Generate navigation data for templates in the same section
  let navigation = null
  if (block.category && block.section) {
    const sectionTemplates = (registry.blocks || [])
      .filter((b: any) => b.category === block.category && b.section === block.section)
      .sort((a: any, b: any) => {
        // Sort by theme: standard first, then minimal, then bold
        const themeOrder = { 'standard': 0, 'minimal': 1, 'bold': 2 }
        const aOrder = themeOrder[a.theme as keyof typeof themeOrder] ?? 3
        const bOrder = themeOrder[b.theme as keyof typeof themeOrder] ?? 3
        return aOrder - bOrder
      })

    const currentIndex = sectionTemplates.findIndex((b: any) => b.name === blockId)
    
    if (sectionTemplates.length > 1) {
      navigation = {
        previous: currentIndex > 0 ? {
          name: sectionTemplates[currentIndex - 1].name,
          templateName: sectionTemplates[currentIndex - 1].templateName,
          themeName: sectionTemplates[currentIndex - 1].themeName
        } : null,
        next: currentIndex < sectionTemplates.length - 1 ? {
          name: sectionTemplates[currentIndex + 1].name,
          templateName: sectionTemplates[currentIndex + 1].templateName,
          themeName: sectionTemplates[currentIndex + 1].themeName
        } : null,
        currentIndex,
        totalTemplates: sectionTemplates.length
      }
    }
  }

  return { 
    props: { 
      block,
      componentName: blockId,
      navigation
    } 
  }
}
