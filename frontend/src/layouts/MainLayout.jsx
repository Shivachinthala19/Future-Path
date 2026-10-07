import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Navbar } from '../components/common/Navbar.jsx';
import { Footer } from '../components/common/Footer.jsx';
import { MobileNav } from '../components/common/MobileNav.jsx';
import { AIAssistantDrawer } from '../components/ai/AIAssistantDrawer.jsx';

export const MainLayout = () => {
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const location = useLocation();

  // Pages with their own hero or specialized layouts don't need top sub-search
  const isHomeOrLanding = ['/', '/dashboard', '/home', '/login', '/register', '/onboarding'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-indigo-600 selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar onOpenAssistant={() => setAiDrawerOpen(true)} />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-20 md:pb-12">
        <Outlet context={{ openAIAssistant: () => setAiDrawerOpen(true) }} />
      </main>

      {/* Floating AI Career Assistant Button: ✨ (Section 10) */}
      <button
        onClick={() => setAiDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-13 h-13 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all group border-2 border-white/30 cursor-pointer"
        title="Open Future Path AI"
        aria-label="Open Future Path AI Assistant"
      >
        <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform drop-shadow-xs" />
        <span className="sr-only">Open Future Path AI</span>
      </button>

      {/* Global AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
      />

      {/* Brand Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileNav onOpenAssistant={() => setAiDrawerOpen(true)} />
    </div>
  );
};
export default MainLayout;
