'use client';
import TemplateLibraryHero from '../../components/pages/templates/TemplateLibraryHero';
import TemplateGallery from '../../components/pages/templates/TemplateGallery';

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)]">
      <TemplateLibraryHero />
      <TemplateGallery />
    </div>
  );
}
