import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext(null);

const DEFAULT_PROFILE = {
  name: 'Shiva',
  degree: 'B.Tech',
  specialization: 'Computer Science',
  studyText: 'B.Tech Computer Science',
  goal: 'Both', // 'Study Further', 'Get a Job', 'Both', 'Not Sure'
  targetJob: 'fullstack Developer',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('careercompass_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem('careercompass_profile');
      return stored ? JSON.parse(stored) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('careercompass_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('careercompass_user', JSON.stringify(res.user));
            if (res.user.profile?.education?.degreeName) {
              const userProf = {
                name: res.user.name || 'Shiva',
                degree: res.user.profile.education.degreeName,
                specialization: res.user.profile.education.stream || '',
                studyText: `${res.user.profile.education.degreeName} ${res.user.profile.education.stream || ''}`.trim(),
                goal: res.user.profile.targetCareer?.title ? 'Get a Job' : 'Both',
                targetJob: res.user.profile.targetCareer?.title || 'Backend Developer',
              };
              setProfile(userProf);
              localStorage.setItem('careercompass_profile', JSON.stringify(userProf));
            }
          }
        } catch (err) {
          console.warn('[AuthContext] Token validation failed:', err.message);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (emailOrUsername, password, customName = '') => {
    let res;
    try {
      res = await authService.login(emailOrUsername, password);
    } catch (err) {
      // Offline fallback login session if backend is waking up or not connected
      console.warn('[AuthContext] Backend offline. Initializing client session for:', emailOrUsername);
      res = {
        success: true,
        token: 'local-jwt-session-active',
        user: {
          id: 'usr-local-active',
          name: customName || emailOrUsername.split('@')[0],
          email: emailOrUsername.includes('@') ? emailOrUsername : `${emailOrUsername.toLowerCase()}@futurepath.ai`
        }
      };
    }

    if (res && (res.token || res.success)) {
      const activeUser = {
        ...(res.user || {}),
        name: customName || res.user?.name || emailOrUsername.split('@')[0]
      };
      setToken(res.token || 'local-jwt-session-active');
      setUser(activeUser);
      localStorage.setItem('careercompass_token', res.token || 'local-jwt-session-active');
      localStorage.setItem('careercompass_user', JSON.stringify(activeUser));
      saveProfile({ name: activeUser.name, email: activeUser.email });
      return { success: true, user: activeUser, token: res.token || 'local-jwt-session-active' };
    }
    return res;
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    if (res.success && res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('careercompass_token', res.token);
      localStorage.setItem('careercompass_user', JSON.stringify(res.user));
    }
    return res;
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  const saveProfile = (newProfile) => {
    const updated = { ...profile, ...newProfile };
    const spec = (updated.specialization || '').trim();
    const deg = (updated.degree || '').trim();
    if (!newProfile.studyText) {
      updated.studyText = spec ? `${deg} ${spec}`.trim() : deg || 'B.Tech';
    }
    setProfile(updated);
    localStorage.setItem('careercompass_profile', JSON.stringify(updated));
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('careercompass_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        saveProfile,
        token,
        loading,
        isAuthenticated: !!token,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
