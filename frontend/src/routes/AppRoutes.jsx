import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { MainLayout } from '../layouts/MainLayout.jsx';

import { LoginPage } from '../pages/LoginPage.jsx';
import { Dashboard } from '../pages/Dashboard.jsx';
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

/**
 * Protected Route Guard
 * Requires the user to log in before accessing any internal page.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-[#4F46E5] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-slate-500">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

/**
 * Public Route Guard
 * Redirects authenticated users straight to /dashboard when visiting /login.
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Login Route */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* All Website Routes Protected: Opens ONLY after login with details */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Universal Search & Explore */}
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResultsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <SearchResultsPage />
            </ProtectedRoute>
          }
        />

        {/* Universal Future Path Engine */}
        <Route
          path="/my-path"
          element={
            <ProtectedRoute>
              <FuturePathPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/future-path"
          element={
            <ProtectedRoute>
              <FuturePathPage />
            </ProtectedRoute>
          }
        />

        {/* Studies & Degree Details */}
        <Route
          path="/study/:id"
          element={
            <ProtectedRoute>
              <StudyDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-next"
          element={
            <ProtectedRoute>
              <StudyNextPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-next/:id"
          element={
            <ProtectedRoute>
              <StudyDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Jobs Discovery & Detail Pages */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/:id"
          element={
            <ProtectedRoute>
              <JobDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-roadmap"
          element={
            <ProtectedRoute>
              <JobRoadmapPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn"
          element={
            <ProtectedRoute>
              <LearnSkillsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn/:jobId"
          element={
            <ProtectedRoute>
              <LearnSkillsPage />
            </ProtectedRoute>
          }
        />

        {/* Careers & Exams */}
        <Route
          path="/careers"
          element={
            <ProtectedRoute>
              <CareersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/careers/:id"
          element={
            <ProtectedRoute>
              <CareersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exams"
          element={
            <ProtectedRoute>
              <ExamsPage />
            </ProtectedRoute>
          }
        />

        {/* AI Assistant & Profile */}
        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <AIAssistantPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
