import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import TrustSection from '@/components/sections/TrustSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-main)] text-[var(--foreground)] transition-colors duration-300">
      {/* 1. CINEMATIC HERO: Building Digital Products That Matter */}
      <HeroSection />

      {/* 2. EDITORIAL ABOUT: Technology Meets Creativity */}
      <AboutSection />

      {/* 3. ASYMMETRIC SERVICES: Core Engineering Disciplines */}
      <ServicesSection />

      {/* 4. SELECTED PROJECTS: Premium Agency Portfolio Showcase */}
      <PortfolioSection />

      {/* 5. TRUSTED BY TEAMS BUILDING THE FUTURE */}
      <TrustSection />

      {/* 6. MINIMAL CONTACT: Have a Project in Mind? */}
      <ContactSection />
    </div>
  );
}
