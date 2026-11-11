import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar.jsx';
import { Footer } from '../components/common/Footer.jsx';
import { MobileNav } from '../components/common/MobileNav.jsx';
import { AIAssistantDrawer } from '../components/ai/AIAssistantDrawer.jsx';

export const MainLayout = () => {
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-indigo-600 selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar onOpenAssistant={() => setAiDrawerOpen(true)} />

      {/* Main Content Viewport */}
      <main className={`flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-3 sm:py-6 ${isAuthPage ? 'pb-8' : 'pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:pb-12'}`}>
        <Outlet context={{ openAIAssistant: () => setAiDrawerOpen(true) }} />
      </main>

      {/* Global AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
      />

      {/* Brand Footer (Hidden on Login screen) */}
      {!isAuthPage && <Footer />}

      {/* Mobile Bottom Navigation (Hidden on Login screen) */}
      {!isAuthPage && <MobileNav onOpenAssistant={() => setAiDrawerOpen(true)} />}
    </div>
  );
};
export default MainLayout;
