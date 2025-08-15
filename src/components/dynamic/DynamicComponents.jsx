// src/components/dynamic/DynamicComponents.jsx
'use client';
import dynamic from 'next/dynamic';
import { 
  VideoSkeleton, 
  ChatbotSkeleton, 
  GridSkeleton, 
  NetworkDiagramSkeleton,
  SkeletonLoader
} from '../ui/LazyLoader';

// Heavy Components with Dynamic Imports

// 1. Chatbot - Least critical, load last
export const DynamicChatbot = dynamic(
  () => import('../ui/AutoGenChatBot'),
  { 
    ssr: false,
    loading: () => <ChatbotSkeleton />
  }
);

// 2. Video Section - Critical for hero, load immediately
export const DynamicVideoSection = dynamic(
  () => import('../ui/VideoSection'),
  { 
    ssr: false,
    loading: () => <VideoSkeleton />
  }
);

// 3. [Removed - InteractiveBentoGrid not used in project]

// 3. Feature Section - Heavy network diagrams
export const DynamicFeatureSection = dynamic(
  () => import('../sections/FeatureSection'),
  { 
    ssr: false,
    loading: () => <NetworkDiagramSkeleton />
  }
);

// 4. All Tip Sections - Heavy animations
export const DynamicTipOne = dynamic(
  () => import('../sections/TipOne'),
  { 
    ssr: false,
    loading: () => <SkeletonLoader height="h-screen" className="bg-black" />
  }
);

export const DynamicTipTwo = dynamic(
  () => import('../sections/TipTwo'),
  { 
    ssr: false,
    loading: () => <SkeletonLoader height="h-screen" className="bg-black" />
  }
);

export const DynamicTipThree = dynamic(
  () => import('../sections/TipThree'),
  { 
    ssr: false,
    loading: () => <SkeletonLoader height="h-screen" className="bg-black" />
  }
);

export const DynamicTipFour = dynamic(
  () => import('../sections/TipFour'),
  { 
    ssr: false,
    loading: () => <SkeletonLoader height="h-screen" className="bg-black" />
  }
);

export const DynamicTipFive = dynamic(
  () => import('../sections/TipFive'),
  { 
    ssr: false,
    loading: () => <SkeletonLoader height="h-screen" className="bg-black" />
  }
);

// 5. Three Steps - Medium priority
export const DynamicThreeSteps = dynamic(
  () => import('../sections/ThreeSteps'),
  { 
    ssr: false,
    loading: () => <SkeletonLoader height="h-screen" className="bg-black" />
  }
);

// 6. Train Sections - Heavy animations
export const DynamicTrainSectionTwo = dynamic(
  () => import('../sections/TrainSectionTwo'),
  { 
    ssr: false,
    loading: () => (
      <div className="relative w-full bg-black py-24 overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h4 className="text-purple-400 font-medium mb-4">Railway Components</h4>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
              Pixel-perfect UIs, embedded in minutes
            </h2>
          </div>
          <GridSkeleton />
        </div>
      </div>
    )
  }
);

// 7. Testimonial Section - Heavy with images
export const DynamicTestimonialSection = dynamic(
  () => import('../sections/TestimonialSection'),
  { 
    ssr: false,
    loading: () => (
      <section className='max-w-[1864px] text-left px-5 py-16 md:py-20 mx-auto relative overflow-hidden'>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Developers
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See what developers and teams are saying about their experience
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <SkeletonLoader height="h-96" className="rounded-3xl" />
          <SkeletonLoader height="h-64" className="rounded-xl" />
        </div>
      </section>
    )
  }
);

// 8. Pricing Section - Medium weight
export const DynamicPricingSection = dynamic(
  () => import('../sections/PricingSection'),
  { 
    ssr: false,
    loading: () => (
      <section className='max-w-[1864px] text-left px-5 py-16 md:py-20 mx-auto relative overflow-hidden'>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[...Array(3)].map((_, i) => (
            <SkeletonLoader key={i} height="h-96" className="rounded-2xl" />
          ))}
        </div>
      </section>
    )
  }
);

// 9. Contact Section - Heavy form + animations
export const DynamicContactSection = dynamic(
  () => import('../sections/ContactSection'),
  { 
    ssr: false,
    loading: () => (
      <section className='max-w-[1864px] text-left px-5 py-16 md:py-20 mx-auto relative overflow-hidden'>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <SkeletonLoader height="h-96" className="rounded-2xl" />
          <SkeletonLoader height="h-96" className="rounded-2xl" />
        </div>
      </section>
    )
  }
);

// 10. About Us Section - Heavy with animations
export const DynamicAboutUsSection = dynamic(
  () => import('../sections/AboutUsSection'),
  { 
    ssr: false,
    loading: () => (
      <section className="relative w-full bg-[linear-gradient(180deg,#07060B_50%,#0A090E_100%)] py-20 overflow-hidden min-h-screen">
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Us
            </h2>
          </div>
          <SkeletonLoader height="h-96" className="rounded-2xl mb-8" />
          <SkeletonLoader height="h-64" className="rounded-xl" />
        </div>
      </section>
    )
  }
);

// 11. FAQ Section - Heavy with animations
export const DynamicFAQSection = dynamic(
  () => import('../sections/FAQSection'),
  { 
    ssr: false,
    loading: () => (
      <section className="relative w-full bg-[linear-gradient(180deg,#07060B_50%,#0A090E_100%)] py-20 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} height="h-16" className="rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }
);

// Progressive Loading Strategy - Load in order of importance
export const useProgressiveLoading = () => {
  return {
    // Critical (load immediately)
    critical: [
      'Hero',
      'LogoScrollSection', 
      'Navbar',
      'Footer'
    ],
    
    // High priority (load after critical, in viewport)
    high: [
      'DynamicThreeSteps',
      'DynamicTipOne',
      'DynamicTipTwo'
    ],
    
    // Medium priority (load when in viewport)
    medium: [
      'DynamicTipThree',
      'DynamicTipFour', 
      'DynamicTipFive',
      'DynamicTrainSectionTwo',
      'DynamicFeatureSection'
    ],
    
    // Low priority (load when in viewport, with delay)
    low: [
      'DynamicPricingSection',
      'DynamicTestimonialSection',
      'DynamicContactSection',
      'DynamicAboutUsSection',
      'DynamicFAQSection'
    ],
    
    // Lowest priority (load on interaction or after everything else)
    lowest: [
      'DynamicChatbot',
      'DynamicVideoSection'
    ]
  };
};

export default {
  DynamicChatbot,
  DynamicVideoSection,
  DynamicFeatureSection,
  DynamicTipOne,
  DynamicTipTwo,
  DynamicTipThree,
  DynamicTipFour,
  DynamicTipFive,
  DynamicThreeSteps,
  DynamicTrainSectionTwo,
  DynamicTestimonialSection,
  DynamicPricingSection,
  DynamicContactSection,
  DynamicAboutUsSection,
  DynamicFAQSection,
};