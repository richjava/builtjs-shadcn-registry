import { useRouter } from 'next/router'
import * as fs from 'fs'
import * as path from 'path'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Check } from 'lucide-react'
import Header from '@/components/header'
import TemplateNavigation from '@/components/template-navigation'
import { useState, useEffect } from 'react'
import { resolveBlockCollections, debugCollectionResolution } from '@/lib/collection-resolver'

// Import all block components
import AboutLandingImage from '@/blocks/about/about-landing/image/component'
import AboutLandingMinimalImage from '@/blocks/about/about-landing/minimal-image/component'
import AboutLandingBoldImage from '@/blocks/about/about-landing/bold-image/component'
import AboutLandingNeobrutalismImage from '@/blocks/about/about-landing/neobrutalism-image/component'
import AboutLandingStats from '@/blocks/about/about-landing/stats/component'
import AboutLandingMinimalStats from '@/blocks/about/about-landing/minimal-stats/component'
import AboutLandingBoldStats from '@/blocks/about/about-landing/bold-stats/component'
import AboutLandingNeobrutalismStats from '@/blocks/about/about-landing/neobrutalism-stats/component'
import AboutCompanyStoryNarrative from '@/blocks/about/about-company-story/narrative/component'
import AboutCompanyStoryMinimalNarrative from '@/blocks/about/about-company-story/minimal-narrative/component'
import AboutCompanyStoryBoldNarrative from '@/blocks/about/about-company-story/bold-narrative/component'
import AboutCompanyStoryNeobrutalismNarrative from '@/blocks/about/about-company-story/neobrutalism-narrative/component'
import AboutValuesGrid from '@/blocks/about/about-values/grid/component'
import AboutValuesMinimalGrid from '@/blocks/about/about-values/minimal-grid/component'
import AboutValuesBoldGrid from '@/blocks/about/about-values/bold-grid/component'
import AboutValuesNeobrutalismGrid from '@/blocks/about/about-values/neobrutalism-grid/component'
import AboutTeamCards from '@/blocks/about/about-team/cards/component'
import AboutTeamMinimalCards from '@/blocks/about/about-team/minimal-cards/component'
import AboutTeamBoldCards from '@/blocks/about/about-team/bold-cards/component'
import AboutTeamNeobrutalismCards from '@/blocks/about/about-team/neobrutalism-cards/component'
import AboutMissionStatement from '@/blocks/about/about-mission/statement/component'
import AboutMissionMinimalStatement from '@/blocks/about/about-mission/minimal-statement/component'
import AboutMissionBoldStatement from '@/blocks/about/about-mission/bold-statement/component'
import AboutMissionNeobrutalismStatement from '@/blocks/about/about-mission/neobrutalism-statement/component'
import SimpleNav from '@/blocks/header/simple-nav/component'
import HeroSection from '@/blocks/main-landing/hero-section/component'
import MainHeroSectionStandard from '@/blocks/main/hero-section/standard/component'
import MainHeroSectionMinimal from '@/blocks/main/hero-section/minimal/component'
import MainHeroSectionBold from '@/blocks/main/hero-section/bold/component'
import MainHeroSectionNeobrutalism from '@/blocks/main/hero-section/neobrutalism/component'
import ValuePropositionStandard from '@/blocks/main/value-proposition/standard/component'
import ValuePropositionMinimal from '@/blocks/main/value-proposition/minimal/component'
import ValuePropositionBold from '@/blocks/main/value-proposition/bold/component'
import ValuePropositionNeobrutalism from '@/blocks/main/value-proposition/neobrutalism/component'
import SocialProofStandard from '@/blocks/main/social-proof/standard/component'
import SocialProofMinimal from '@/blocks/main/social-proof/minimal/component'
import SocialProofBold from '@/blocks/main/social-proof/bold/component'
import SocialProofNeobrutalism from '@/blocks/main/social-proof/neobrutalism/component'
import CallToActionStandard from '@/blocks/main/call-to-action/standard/component'
import CallToActionMinimal from '@/blocks/main/call-to-action/minimal/component'
import CallToActionBold from '@/blocks/main/call-to-action/bold/component'
import CallToActionNeobrutalism from '@/blocks/main/call-to-action/neobrutalism/component'
import TrustIndicatorsStandard from '@/blocks/main/trust-indicators/standard/component'
import TrustIndicatorsMinimal from '@/blocks/main/trust-indicators/minimal/component'
import TrustIndicatorsBold from '@/blocks/main/trust-indicators/bold/component'
import TrustIndicatorsNeobrutalism from '@/blocks/main/trust-indicators/neobrutalism/component'
import ProblemSolutionStandard from '@/blocks/main/problem-solution/standard/component'
import ProblemSolutionMinimal from '@/blocks/main/problem-solution/minimal/component'
import ProblemSolutionBold from '@/blocks/main/problem-solution/bold/component'
import ProblemSolutionNeobrutalism from '@/blocks/main/problem-solution/neobrutalism/component'
import ContactLeadGenerationStandard from '@/blocks/main/contact-lead-generation/standard/component'
import ContactLeadGenerationMinimal from '@/blocks/main/contact-lead-generation/minimal/component'
import ContactLeadGenerationBold from '@/blocks/main/contact-lead-generation/bold/component'
import ContactLeadGenerationNeobrutalism from '@/blocks/main/contact-lead-generation/neobrutalism/component'
import FeaturesShowcase from '@/blocks/features/showcase/standard/component'
import FeaturesShowcaseMinimal from '@/blocks/features/showcase/minimal/component'
import FeaturesShowcaseBold from '@/blocks/features/showcase/bold/component'
import FeaturesShowcaseNeobrutalism from '@/blocks/features/showcase/neobrutalism/component'
import FeaturesHighlights from '@/blocks/features/highlights/standard/component'
import FeaturesHighlightsMinimal from '@/blocks/features/highlights/minimal/component'
import FeaturesHighlightsBold from '@/blocks/features/highlights/bold/component'
import FeaturesHighlightsNeobrutalism from '@/blocks/features/highlights/neobrutalism/component'
import FeaturesCapabilities from '@/blocks/features/capabilities/standard/component'
import FeaturesCapabilitiesMinimal from '@/blocks/features/capabilities/minimal/component'
import FeaturesCapabilitiesBold from '@/blocks/features/capabilities/bold/component'
import FeaturesCapabilitiesNeobrutalism from '@/blocks/features/capabilities/neobrutalism/component'
import ServicesOfferings from '@/blocks/services/offerings/standard/component'
import ServicesSolutions from '@/blocks/services/solutions/standard/component'
import ServicesServices from '@/blocks/services/services/standard/component'
import ServicesOfferingsMinimal from '@/blocks/services/offerings/minimal/component'
import ServicesOfferingsBold from '@/blocks/services/offerings/bold/component'
import ServicesOfferingsNeobrutalism from '@/blocks/services/offerings/neobrutalism/component'
import ServicesServicesMinimal from '@/blocks/services/services/minimal/component'
import ServicesServicesBold from '@/blocks/services/services/bold/component'
import ServicesServicesNeobrutalism from '@/blocks/services/services/neobrutalism/component'
import ServicesSolutionsMinimal from '@/blocks/services/solutions/minimal/component'
import ServicesSolutionsBold from '@/blocks/services/solutions/bold/component'
import ServicesSolutionsNeobrutalism from '@/blocks/services/solutions/neobrutalism/component'
import TeamProfiles from '@/blocks/team/profiles/standard/component'
import TeamCulture from '@/blocks/team/culture/standard/component'
import TeamMembers from '@/blocks/team/members/standard/component'
import TeamCultureMinimal from '@/blocks/team/culture/minimal/component'
import TeamCultureBold from '@/blocks/team/culture/bold/component'
import TeamCultureNeobrutalism from '@/blocks/team/culture/neobrutalism/component'
import TeamMembersMinimal from '@/blocks/team/members/minimal/component'
import TeamMembersBold from '@/blocks/team/members/bold/component'
import TeamMembersNeobrutalism from '@/blocks/team/members/neobrutalism/component'
import TeamProfilesMinimal from '@/blocks/team/profiles/minimal/component'
import TeamProfilesBold from '@/blocks/team/profiles/bold/component'
import TeamProfilesNeobrutalism from '@/blocks/team/profiles/neobrutalism/component'
import FeatureGrid from '@/blocks/features-list/feature-grid/component'
import SimpleFooter from '@/blocks/footer/simple-footer/component'
import PricingCards from '@/blocks/pricing/pricing-cards/component'

// FAQ Components
import FAQQuestionsStandard from '@/blocks/faq/questions/standard/component'
import FAQQuestionsMinimal from '@/blocks/faq/questions/minimal/component'
import FAQQuestionsBold from '@/blocks/faq/questions/bold/component'
import FAQQuestionsNeobrutalism from '@/blocks/faq/questions/neobrutalism/component'
import FAQHelpStandard from '@/blocks/faq/help/standard/component'
import FAQHelpMinimal from '@/blocks/faq/help/minimal/component'
import FAQHelpBold from '@/blocks/faq/help/bold/component'
import FAQHelpNeobrutalism from '@/blocks/faq/help/neobrutalism/component'
import FAQSupportStandard from '@/blocks/faq/support/standard/component'
import FAQSupportMinimal from '@/blocks/faq/support/minimal/component'
import FAQSupportBold from '@/blocks/faq/support/bold/component'
import FAQSupportNeobrutalism from '@/blocks/faq/support/neobrutalism/component'

// Logos Components
import LogosClientsStandard from '@/blocks/logos/clients/standard/component'
import LogosClientsMinimal from '@/blocks/logos/clients/minimal/component'
import LogosClientsBold from '@/blocks/logos/clients/bold/component'
import LogosClientsNeobrutalism from '@/blocks/logos/clients/neobrutalism/component'
import LogosPartnersStandard from '@/blocks/logos/partners/standard/component'
import LogosPartnersMinimal from '@/blocks/logos/partners/minimal/component'
import LogosPartnersBold from '@/blocks/logos/partners/bold/component'
import LogosPartnersNeobrutalism from '@/blocks/logos/partners/neobrutalism/component'
import LogosBrandsStandard from '@/blocks/logos/brands/standard/component'
import LogosBrandsMinimal from '@/blocks/logos/brands/minimal/component'
import LogosBrandsBold from '@/blocks/logos/brands/bold/component'
import LogosBrandsNeobrutalism from '@/blocks/logos/brands/neobrutalism/component'

// Newsletter Components
import NewsletterSignupStandard from '@/blocks/newsletter/signup/standard/component'
import NewsletterSignupMinimal from '@/blocks/newsletter/signup/minimal/component'
import NewsletterSignupBold from '@/blocks/newsletter/signup/bold/component'
import NewsletterSignupNeobrutalism from '@/blocks/newsletter/signup/neobrutalism/component'
import NewsletterSubscriptionStandard from '@/blocks/newsletter/subscription/standard/component'
import NewsletterSubscriptionMinimal from '@/blocks/newsletter/subscription/minimal/component'
import NewsletterSubscriptionBold from '@/blocks/newsletter/subscription/bold/component'
import NewsletterSubscriptionNeobrutalism from '@/blocks/newsletter/subscription/neobrutalism/component'
import NewsletterOptInStandard from '@/blocks/newsletter/opt-in/standard/component'
import NewsletterOptInMinimal from '@/blocks/newsletter/opt-in/minimal/component'
import NewsletterOptInBold from '@/blocks/newsletter/opt-in/bold/component'
import NewsletterOptInNeobrutalism from '@/blocks/newsletter/opt-in/neobrutalism/component'

// Blog Components
import BlogArticleStandard from '@/blocks/blog/blog-article/standard/component'
import BlogArticleMinimal from '@/blocks/blog/blog-article/minimal/component'
import BlogArticleBold from '@/blocks/blog/blog-article/bold/component'
import BlogArticleNeobrutalism from '@/blocks/blog/blog-article/neobrutalism/component'
import BlogPostsStandard from '@/blocks/blog/blog-posts/standard/component'
import BlogPostsMinimal from '@/blocks/blog/blog-posts/minimal/component'
import BlogPostsBold from '@/blocks/blog/blog-posts/bold/component'
import BlogPostsNeobrutalism from '@/blocks/blog/blog-posts/neobrutalism/component'
import FeaturedPostsStandard from '@/blocks/blog/featured-posts/standard/component'
import FeaturedPostsMinimal from '@/blocks/blog/featured-posts/minimal/component'
import FeaturedPostsBold from '@/blocks/blog/featured-posts/bold/component'
import FeaturedPostsNeobrutalism from '@/blocks/blog/featured-posts/neobrutalism/component'

// Gallery Components
import GalleryPortfolioStandard from '@/blocks/gallery/portfolio/standard/component'
import GalleryPortfolioMinimal from '@/blocks/gallery/portfolio/minimal/component'
import GalleryPortfolioBold from '@/blocks/gallery/portfolio/bold/component'
import GalleryPortfolioNeobrutalism from '@/blocks/gallery/portfolio/neobrutalism/component'
import GalleryProductsStandard from '@/blocks/gallery/products/standard/component'
import GalleryProductsMinimal from '@/blocks/gallery/products/minimal/component'
import GalleryProductsBold from '@/blocks/gallery/products/bold/component'
import GalleryProductsNeobrutalism from '@/blocks/gallery/products/neobrutalism/component'
import GalleryShowcaseStandard from '@/blocks/gallery/showcase/standard/component'
import GalleryShowcaseMinimal from '@/blocks/gallery/showcase/minimal/component'
import GalleryShowcaseBold from '@/blocks/gallery/showcase/bold/component'
import GalleryShowcaseNeobrutalism from '@/blocks/gallery/showcase/neobrutalism/component'

// Pricing Components
import PricingPlansStandard from '@/blocks/pricing/plans/standard/component'
import PricingPlansMinimal from '@/blocks/pricing/plans/minimal/component'
import PricingPlansBold from '@/blocks/pricing/plans/bold/component'
import PricingPlansNeobrutalism from '@/blocks/pricing/plans/neobrutalism/component'
import PricingTablesStandard from '@/blocks/pricing/tables/standard/component'
import PricingTablesMinimal from '@/blocks/pricing/tables/minimal/component'
import PricingTablesBold from '@/blocks/pricing/tables/bold/component'
import PricingTablesNeobrutalism from '@/blocks/pricing/tables/neobrutalism/component'
import PricingSubscriptionStandard from '@/blocks/pricing/subscription/standard/component'
import PricingSubscriptionMinimal from '@/blocks/pricing/subscription/minimal/component'
import PricingSubscriptionBold from '@/blocks/pricing/subscription/bold/component'
import PricingSubscriptionNeobrutalism from '@/blocks/pricing/subscription/neobrutalism/component'

const blockComponents: Record<string, React.ComponentType<any>> = {
  'about-landing-image-standard': AboutLandingImage,
  'about-landing-image-minimal': AboutLandingMinimalImage,
  'about-landing-image-bold': AboutLandingBoldImage,
  'about-landing-image-neobrutalism': AboutLandingNeobrutalismImage,
  'about-landing-stats-standard': AboutLandingStats,
  'about-landing-stats-minimal': AboutLandingMinimalStats,
  'about-landing-stats-bold': AboutLandingBoldStats,
  'about-landing-stats-neobrutalism': AboutLandingNeobrutalismStats,
  'about-company-story-narrative-standard': AboutCompanyStoryNarrative,
  'about-company-story-narrative-minimal': AboutCompanyStoryMinimalNarrative,
  'about-company-story-narrative-bold': AboutCompanyStoryBoldNarrative,
  'about-company-story-narrative-neobrutalism': AboutCompanyStoryNeobrutalismNarrative,
  'about-values-grid-standard': AboutValuesGrid,
  'about-values-grid-minimal': AboutValuesMinimalGrid,
  'about-values-grid-bold': AboutValuesBoldGrid,
  'about-values-grid-neobrutalism': AboutValuesNeobrutalismGrid,
  'about-team-cards-standard': AboutTeamCards,
  'about-team-cards-minimal': AboutTeamMinimalCards,
  'about-team-cards-bold': AboutTeamBoldCards,
  'about-team-cards-neobrutalism': AboutTeamNeobrutalismCards,
  'about-mission-statement-standard': AboutMissionStatement,
  'about-mission-statement-minimal': AboutMissionMinimalStatement,
  'about-mission-statement-bold': AboutMissionBoldStatement,
  'about-mission-statement-neobrutalism': AboutMissionNeobrutalismStatement,
  'header-simple-nav': SimpleNav,
  'main-landing-hero-section': HeroSection,
  'main-hero-section-hero-section-standard': MainHeroSectionStandard,
  'main-hero-section-hero-section-minimal': MainHeroSectionMinimal,
  'main-hero-section-hero-section-bold': MainHeroSectionBold,
  'main-hero-section-hero-section-neobrutalism': MainHeroSectionNeobrutalism,
  'main-value-proposition-value-proposition-standard': ValuePropositionStandard,
  'main-value-proposition-value-proposition-minimal': ValuePropositionMinimal,
  'main-value-proposition-value-proposition-bold': ValuePropositionBold,
  'main-value-proposition-value-proposition-neobrutalism': ValuePropositionNeobrutalism,
  'main-social-proof-social-proof-standard': SocialProofStandard,
  'main-social-proof-social-proof-minimal': SocialProofMinimal,
  'main-social-proof-social-proof-bold': SocialProofBold,
  'main-social-proof-social-proof-neobrutalism': SocialProofNeobrutalism,
  'main-call-to-action-call-to-action-standard': CallToActionStandard,
  'main-call-to-action-call-to-action-minimal': CallToActionMinimal,
  'main-call-to-action-call-to-action-bold': CallToActionBold,
  'main-call-to-action-call-to-action-neobrutalism': CallToActionNeobrutalism,
  'main-trust-indicators-trust-indicators-standard': TrustIndicatorsStandard,
  'main-trust-indicators-trust-indicators-minimal': TrustIndicatorsMinimal,
  'main-trust-indicators-trust-indicators-bold': TrustIndicatorsBold,
  'main-trust-indicators-trust-indicators-neobrutalism': TrustIndicatorsNeobrutalism,
  'main-problem-solution-problem-solution-standard': ProblemSolutionStandard,
  'main-problem-solution-problem-solution-minimal': ProblemSolutionMinimal,
  'main-problem-solution-problem-solution-bold': ProblemSolutionBold,
  'main-problem-solution-problem-solution-neobrutalism': ProblemSolutionNeobrutalism,
  'main-contact-lead-generation-contact-lead-generation-standard': ContactLeadGenerationStandard,
  'main-contact-lead-generation-contact-lead-generation-minimal': ContactLeadGenerationMinimal,
  'main-contact-lead-generation-contact-lead-generation-bold': ContactLeadGenerationBold,
  'main-contact-lead-generation-contact-lead-generation-neobrutalism': ContactLeadGenerationNeobrutalism,
  'features-showcase-showcase-standard': FeaturesShowcase,
  'features-showcase-showcase-minimal': FeaturesShowcaseMinimal,
  'features-showcase-showcase-bold': FeaturesShowcaseBold,
  'features-showcase-showcase-neobrutalism': FeaturesShowcaseNeobrutalism,
  'features-highlights-highlights-standard': FeaturesHighlights,
  'features-highlights-highlights-minimal': FeaturesHighlightsMinimal,
  'features-highlights-highlights-bold': FeaturesHighlightsBold,
  'features-highlights-highlights-neobrutalism': FeaturesHighlightsNeobrutalism,
  'features-capabilities-capabilities-standard': FeaturesCapabilities,
  'features-capabilities-capabilities-minimal': FeaturesCapabilitiesMinimal,
  'features-capabilities-capabilities-bold': FeaturesCapabilitiesBold,
  'features-capabilities-capabilities-neobrutalism': FeaturesCapabilitiesNeobrutalism,
  'services-offerings-offerings-standard': ServicesOfferings,
  'services-offerings-offerings-minimal': ServicesOfferingsMinimal,
  'services-offerings-offerings-bold': ServicesOfferingsBold,
  'services-offerings-offerings-neobrutalism': ServicesOfferingsNeobrutalism,
  'services-solutions-solutions-standard': ServicesSolutions,
  'services-solutions-solutions-minimal': ServicesSolutionsMinimal,
  'services-solutions-solutions-bold': ServicesSolutionsBold,
  'services-solutions-solutions-neobrutalism': ServicesSolutionsNeobrutalism,
  'services-services-services-standard': ServicesServices,
  'services-services-services-minimal': ServicesServicesMinimal,
  'services-services-services-bold': ServicesServicesBold,
  'services-services-services-neobrutalism': ServicesServicesNeobrutalism,
  'features-list-feature-grid': FeatureGrid,
  'footer-simple-footer': SimpleFooter,
  'pricing-pricing-cards': PricingCards,
  'team-profiles-profiles-standard': TeamProfiles,
  'team-profiles-profiles-minimal': TeamProfilesMinimal,
  'team-profiles-profiles-bold': TeamProfilesBold,
  'team-profiles-profiles-neobrutalism': TeamProfilesNeobrutalism,
  'team-culture-culture-standard': TeamCulture,
  'team-culture-culture-minimal': TeamCultureMinimal,
  'team-culture-culture-bold': TeamCultureBold,
  'team-culture-culture-neobrutalism': TeamCultureNeobrutalism,
  'team-members-members-standard': TeamMembers,
  'team-members-members-minimal': TeamMembersMinimal,
  'team-members-members-bold': TeamMembersBold,
  'team-members-members-neobrutalism': TeamMembersNeobrutalism,
  'faq-questions-questions-standard': FAQQuestionsStandard,
  'faq-questions-questions-minimal': FAQQuestionsMinimal,
  'faq-questions-questions-bold': FAQQuestionsBold,
  'faq-questions-questions-neobrutalism': FAQQuestionsNeobrutalism,
  'faq-help-help-standard': FAQHelpStandard,
  'faq-help-help-minimal': FAQHelpMinimal,
  'faq-help-help-bold': FAQHelpBold,
  'faq-help-help-neobrutalism': FAQHelpNeobrutalism,
  'faq-support-support-standard': FAQSupportStandard,
  'faq-support-support-minimal': FAQSupportMinimal,
  'faq-support-support-bold': FAQSupportBold,
  'faq-support-support-neobrutalism': FAQSupportNeobrutalism,
  'logos-clients-clients-standard': LogosClientsStandard,
  'logos-clients-clients-minimal': LogosClientsMinimal,
  'logos-clients-clients-bold': LogosClientsBold,
  'logos-clients-clients-neobrutalism': LogosClientsNeobrutalism,
  'logos-partners-partners-standard': LogosPartnersStandard,
  'logos-partners-partners-minimal': LogosPartnersMinimal,
  'logos-partners-partners-bold': LogosPartnersBold,
  'logos-partners-partners-neobrutalism': LogosPartnersNeobrutalism,
  'logos-brands-brands-standard': LogosBrandsStandard,
  'logos-brands-brands-minimal': LogosBrandsMinimal,
  'logos-brands-brands-bold': LogosBrandsBold,
  'logos-brands-brands-neobrutalism': LogosBrandsNeobrutalism,
  'newsletter-signup-signup-standard': NewsletterSignupStandard,
  'newsletter-signup-signup-minimal': NewsletterSignupMinimal,
  'newsletter-signup-signup-bold': NewsletterSignupBold,
  'newsletter-signup-signup-neobrutalism': NewsletterSignupNeobrutalism,
  'newsletter-subscription-subscription-standard': NewsletterSubscriptionStandard,
  'newsletter-subscription-subscription-minimal': NewsletterSubscriptionMinimal,
  'newsletter-subscription-subscription-bold': NewsletterSubscriptionBold,
  'newsletter-subscription-subscription-neobrutalism': NewsletterSubscriptionNeobrutalism,
  'newsletter-opt-in-opt-in-standard': NewsletterOptInStandard,
  'newsletter-opt-in-opt-in-minimal': NewsletterOptInMinimal,
  'newsletter-opt-in-opt-in-bold': NewsletterOptInBold,
  'newsletter-opt-in-opt-in-neobrutalism': NewsletterOptInNeobrutalism,
  'blog-blog-article-blog-article-standard': BlogArticleStandard,
  'blog-blog-article-blog-article-minimal': BlogArticleMinimal,
  'blog-blog-article-blog-article-bold': BlogArticleBold,
  'blog-blog-article-blog-article-neobrutalism': BlogArticleNeobrutalism,
  'blog-blog-posts-blog-posts-standard': BlogPostsStandard,
  'blog-blog-posts-blog-posts-minimal': BlogPostsMinimal,
  'blog-blog-posts-blog-posts-bold': BlogPostsBold,
  'blog-blog-posts-blog-posts-neobrutalism': BlogPostsNeobrutalism,
  'blog-featured-posts-featured-posts-standard': FeaturedPostsStandard,
  'blog-featured-posts-featured-posts-minimal': FeaturedPostsMinimal,
  'blog-featured-posts-featured-posts-bold': FeaturedPostsBold,
  'blog-featured-posts-featured-posts-neobrutalism': FeaturedPostsNeobrutalism,
  'gallery-portfolio-portfolio-standard': GalleryPortfolioStandard,
  'gallery-portfolio-portfolio-minimal': GalleryPortfolioMinimal,
  'gallery-portfolio-portfolio-bold': GalleryPortfolioBold,
  'gallery-portfolio-portfolio-neobrutalism': GalleryPortfolioNeobrutalism,
  'gallery-products-products-standard': GalleryProductsStandard,
  'gallery-products-products-minimal': GalleryProductsMinimal,
  'gallery-products-products-bold': GalleryProductsBold,
  'gallery-products-products-neobrutalism': GalleryProductsNeobrutalism,
  'gallery-showcase-showcase-standard': GalleryShowcaseStandard,
  'gallery-showcase-showcase-minimal': GalleryShowcaseMinimal,
  'gallery-showcase-showcase-bold': GalleryShowcaseBold,
  'gallery-showcase-showcase-neobrutalism': GalleryShowcaseNeobrutalism,
  'pricing-plans-plans-standard': PricingPlansStandard,
  'pricing-plans-plans-minimal': PricingPlansMinimal,
  'pricing-plans-plans-bold': PricingPlansBold,
  'pricing-plans-plans-neobrutalism': PricingPlansNeobrutalism,
  'pricing-tables-tables-standard': PricingTablesStandard,
  'pricing-tables-tables-minimal': PricingTablesMinimal,
  'pricing-tables-tables-bold': PricingTablesBold,
  'pricing-tables-tables-neobrutalism': PricingTablesNeobrutalism,
  'pricing-subscription-subscription-standard': PricingSubscriptionStandard,
  'pricing-subscription-subscription-minimal': PricingSubscriptionMinimal,
  'pricing-subscription-subscription-bold': PricingSubscriptionBold,
  'pricing-subscription-subscription-neobrutalism': PricingSubscriptionNeobrutalism,
}

interface BlockData {
  name: string
  description?: string
  moduleName: string
  sectionName: string
  templateName: string
  themeName: string
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
  const [copied, setCopied] = useState(false)
  const [isThumbnail, setIsThumbnail] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)
    // Check for thumbnail parameter on client side
    const urlParams = new URLSearchParams(window.location.search)
    setIsThumbnail(urlParams.get('thumbnail') === 'true')
  }, [])

  const handleCopyCode = async () => {
    try {
      // Fetch the component content from the API
      const response = await fetch(`/api/component/${componentName}`)
      if (!response.ok) {
        throw new Error('Failed to fetch component content')
      }
      
      const data = await response.json()
      
      // Copy to clipboard
      await navigator.clipboard.writeText(data.content)
      setCopied(true)
      
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

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

  // Show loading state during SSR and initial client render to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="w-full h-full bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-xs text-gray-500">Loading preview...</p>
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
                <Link href={`/section/${block.moduleName.toLowerCase()}/${block.sectionName.toLowerCase().replace(/\s+/g, '-')}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Section
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">
                  {block.templateName} - {block.themeName}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {block.moduleName} Module
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={handleCopyCode}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Copy Code
                  </>
                )}
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
  if (block.moduleName && block.sectionName) {
    const sectionTemplates = (registry.blocks || [])
      .filter((b: any) => b.moduleName === block.moduleName && b.sectionName === block.sectionName)
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

  // Resolve collections for the block
  const { collections: resolvedCollections, data: blockData } = await resolveBlockCollections(blockId)
  
  // Debug collection resolution in development
  debugCollectionResolution(
    blockId,
    resolvedCollections
  )

  return { 
    props: { 
      block: {
        ...block,
        data: blockData, // Pass the data field from blocks-index.json
        collectionsData: resolvedCollections // Pass resolved collections as collectionsData for compatibility
      },
      componentName: blockId,
      navigation
    }
  }
}
