'use client';
import ComponentLibraryHero from '@/components/pages/components/ComponentLibraryHero';
import ComponentShowcase from '@/components/pages/components/ComponentShowcase';
import ComponentGallery from '@/components/pages/components/ComponentGallery';

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)]">
      <ComponentLibraryHero />
      <ComponentShowcase />
      <ComponentGallery />
    </div>
  );
}
