'use client';
import TemplateLibraryHero from '@/components/pages/templates/TemplateLibraryHero';
import PremiumTemplateShowcase from '@/components/pages/templates/PremiumTemplateShowcase';
import { useAuth } from '@/contexts/AuthContext';

export default function TemplatesPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <TemplateLibraryHero />
      
      {/* Templates Section with different background */}
      <div className="bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] pt-16">
        {/* Show only user's templates with create button */}
        <PremiumTemplateShowcase showMyTemplates={true} />
        
        {/* Show 4 highly rated templates */}
        <PremiumTemplateShowcase showMyTemplates={false} />
      </div>
    </div>
  );
}