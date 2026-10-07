import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { EducationProvider } from './context/EducationContext.jsx';
import { AppRoutes } from './routes/AppRoutes.jsx';
import { ChangeEducationModal, ChangeTargetJobModal, TargetMismatchModal } from './components/ChangeEducation.jsx';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <EducationProvider>
            <AppRoutes />
            <ChangeEducationModal />
            <ChangeTargetJobModal />
            <TargetMismatchModal />
          </EducationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
