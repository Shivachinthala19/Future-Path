import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout.jsx';

import { LandingPage } from '../pages/LandingPage.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { RegisterPage } from '../pages/RegisterPage.jsx';
import { Onboarding } from '../pages/Onboarding.jsx';
import { Dashboard } from '../pages/Dashboard.jsx';
import { HomePage } from '../pages/HomePage.jsx';
import { StudyNextPage } from '../pages/StudyNextPage.jsx';
import { LearnSkillsPage } from '../pages/LearnSkillsPage.jsx';
import { JobRoadmapPage } from '../pages/JobRoadmapPage.jsx';
import { JobsPage } from '../pages/JobsPage.jsx';
import { ExamsPage } from '../pages/ExamsPage.jsx';
import { CareersPage } from '../pages/CareersPage.jsx';
import { AIAssistantPage } from '../pages/AIAssistantPage.jsx';
import { ProfilePage } from '../pages/ProfilePage.jsx';
import { SearchResultsPage } from '../pages/SearchResultsPage.jsx';
import { StudyDetailsPage } from '../pages/StudyDetailsPage.jsx';
import { JobDetailsPage } from '../pages/JobDetailsPage.jsx';
import { FuturePathPage } from '../pages/FuturePathPage.jsx';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Core Entry Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Dashboard / Home */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Dashboard />} />

        {/* Universal Search & Explore */}
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/explore" element={<SearchResultsPage />} />

        {/* Universal Future Path Engine (Section 26 & 27) */}
        <Route path="/my-path" element={<FuturePathPage />} />
        <Route path="/future-path" element={<FuturePathPage />} />

        {/* Study Details (Section 8, 9, 10, 11) */}
        <Route path="/study/:id" element={<StudyDetailsPage />} />
        <Route path="/study-next" element={<StudyNextPage />} />
        <Route path="/study-next/:id" element={<StudyDetailsPage />} />

        {/* Jobs Discovery & Detail Pages */}
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/job/:id" element={<JobDetailsPage />} />
        <Route path="/job-roadmap" element={<JobRoadmapPage />} />
        <Route path="/learn" element={<LearnSkillsPage />} />
        <Route path="/learn/:jobId" element={<LearnSkillsPage />} />

        {/* Careers & Exams */}
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:id" element={<CareersPage />} />
        <Route path="/exams" element={<ExamsPage />} />

        {/* AI Assistant & Profile */}
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Catch-all redirect to /dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};
