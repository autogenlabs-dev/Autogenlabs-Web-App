// src/app/page.jsx (Optimized for Fast Initial Load)
import Hero from "../components/sections/Hero";
import LogoScrollSection from "../components/sections/LogoScrollSection";
import { generateMetadata as generateSEOMetadata } from "../lib/seo";

// Lazy-loaded components
import {
  DynamicThreeSteps,
  DynamicTipOne,
  DynamicTipTwo,
  DynamicTipThree,
  DynamicTipFour,
  DynamicTipFive,
  DynamicTrainSectionTwo,
  DynamicFeatureSection,
  DynamicPricingSection,
  DynamicTestimonialSection,
  DynamicContactSection,
  DynamicAboutUsSection,
  DynamicFAQSection,
  DynamicChatbot
} from "../components/dynamic/DynamicComponents";

import { LazyComponent } from "../components/ui/LazyLoader";
import { OptimizedComponent, StaggeredContainer, StaggeredItem, PreloadedComponent } from "../components/ui/OptimizedLoader";

export const metadata = generateSEOMetadata({
  title: "AI Code Editor & Online Compiler",
  description: "Free online code compiler supporting Java, Python, JavaScript & 50+ languages. AI-powered code editor like Cursor & Windsurf with intelligent completion, debugging tools, and real-time collaboration.",
  keywords: ["online code compiler", "java online code compiler", "cursor ai code editor", "windsurf ai code editor", "ai tools for software development", "python compiler online", "javascript online compiler", "ai coding assistant", "code editor with ai", "programming tools"],
  path: "/",
  type: "website"
});

export default function Home() {
  return (
    <div className="bg-[linear-gradient(180deg,_#040406_50%,_#09080D_100%)]">
      {/* Critical - Load immediately */}
      <Hero />
      <LogoScrollSection />

      {/* Above-the-fold content - Load immediately with staggered animations */}
      <StaggeredContainer staggerDelay={100}>
        <StaggeredItem>
          <DynamicThreeSteps />
        </StaggeredItem>

        <StaggeredItem>
          <DynamicTipOne />
        </StaggeredItem>

        <StaggeredItem>
          <DynamicTipTwo />
        </StaggeredItem>

        <StaggeredItem>
          <DynamicTipThree />
        </StaggeredItem>

        <StaggeredItem>
          <DynamicTipFour />
        </StaggeredItem>

        <StaggeredItem>
          <DynamicTipFive />
        </StaggeredItem>

        <StaggeredItem>
          <DynamicTrainSectionTwo />
        </StaggeredItem>
      </StaggeredContainer>

      {/* Feature Section - Preloaded, no blank content */}
      <div className="px-8">
        <PreloadedComponent delay={600}>
          <DynamicFeatureSection />
        </PreloadedComponent>
      </div>

      {/* Below-the-fold content - All preloaded to avoid blank scroll */}
      <PreloadedComponent delay={700}>
        <DynamicPricingSection />
      </PreloadedComponent>

      <PreloadedComponent delay={800}>
        <DynamicTestimonialSection />
      </PreloadedComponent>

      <PreloadedComponent delay={900}>
        <DynamicContactSection />
      </PreloadedComponent>

      <PreloadedComponent delay={1000}>
        <DynamicAboutUsSection />
      </PreloadedComponent>

      <PreloadedComponent delay={1100}>
        <DynamicFAQSection />
      </PreloadedComponent>

      {/* Chatbot - Load after 7 seconds for proper page load */}
      <LazyComponent delay={7000} viewport={false}>
        <DynamicChatbot />
      </LazyComponent>
    </div>
  );
}
