import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSkills } from './components/AboutSkills';
import { ProjectsSection } from './components/ProjectsSection';
import { WorkTimeline } from './components/WorkTimeline';
import { HighResGallery } from './components/HighResGallery';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/admin/AdminPortal';
import { AdminAuthScreen } from './components/admin/AdminAuthScreen';

const MainPortfolioApp: React.FC = () => {
  const { isCMSOpen, setIsCMSOpen, isAdminAuthenticated } = usePortfolio();

  return (
    <div className="min-h-screen bg-[#090D1A] text-slate-100 flex flex-col selection:bg-[#FF7A29] selection:text-white relative">
      {/* Primary Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <AboutSkills />
        <ProjectsSection />
        <WorkTimeline />
        <HighResGallery />
        <BlogSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Dedicated Admin Portal (accessible strictly via URN/URL e.g. #admin, /admin, ?admin) */}
      {isCMSOpen && (
        <>
          {!isAdminAuthenticated ? (
            <AdminAuthScreen onBackToSite={() => setIsCMSOpen(false)} />
          ) : (
            <AdminPortal onClose={() => setIsCMSOpen(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <MainPortfolioApp />
    </PortfolioProvider>
  );
}
