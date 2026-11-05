import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext(null);

const DEFAULT_PROFILE = {
  name: '',
  degree: 'B.Tech',
  specialization: 'Computer Science',
  studyText: 'B.Tech Computer Science',
  goal: 'Both', // 'Study Further', 'Get a Job', 'Both', 'Not Sure'
  targetJob: 'Software Development Engineer (SDE)',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('careercompass_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name?.toLowerCase() === 'shiva' || parsed?.email?.toLowerCase().includes('shiva')) {
          localStorage.removeItem('careercompass_user');
          localStorage.removeItem('careercompass_token');
          return null;
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem('careercompass_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name?.toLowerCase() === 'shiva' || parsed?.email?.toLowerCase().includes('shiva')) {
          localStorage.removeItem('careercompass_profile');
          return DEFAULT_PROFILE;
        }
        return parsed;
      }
      return DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      const t = localStorage.getItem('careercompass_token') || localStorage.getItem('futurepath_token');
      const u = localStorage.getItem('careercompass_user') || localStorage.getItem('futurepath_user');
      if (u && (u.includes('"Shiva"') || u.includes('"shiva@'))) {
        localStorage.removeItem('careercompass_token');
        localStorage.removeItem('careercompass_user');
        localStorage.removeItem('futurepath_token');
        localStorage.removeItem('futurepath_user');
        return null;
      }
      return t || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Initialize Auth on startup (One-time check on initial app mount)
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('careercompass_token') || localStorage.getItem('futurepath_token');
        const storedUser = localStorage.getItem('careercompass_user') || localStorage.getItem('futurepath_user');

        if (storedToken && storedUser) {
          const parsed = JSON.parse(storedUser);
          if (parsed && parsed.name && !parsed.name.toLowerCase().includes('shiva')) {
            setUser(parsed);
            setToken(storedToken);
          } else {
            // Clean up any stale legacy sessions
            logout();
          }
        }
      } catch (err) {
        console.warn('[AuthContext] Session initialization error:', err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // Instant direct login without waiting on or requiring a database
  const login = async (emailOrUsername, password, customName = '') => {
    const rawId = (emailOrUsername || '').trim();
    const isEmail = rawId.includes('@');
    const derivedName = (customName || '').trim() || (isEmail ? rawId.split('@')[0] : rawId) || 'Explorer';
    const capitalizedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
    const email = isEmail ? rawId.toLowerCase() : `${rawId.toLowerCase().replace(/\s+/g, '')}@futurepath.ai`;
    const sessionToken = 'jwt-futurepath-active-session';

    const activeUser = {
      id: `usr-${Date.now()}`,
      name: capitalizedName,
      email: email,
      role: 'user',
      token: sessionToken,
      profile: {
        education: {
          degreeName: 'B.Tech',
          stream: 'Computer Science'
        },
        targetCareer: {
          title: 'Software Development Engineer (SDE)'
        }
      }
    };

    // 1. Immediately set active auth state
    setToken(sessionToken);
    setUser(activeUser);

    // 2. Persist locally to storage
    localStorage.setItem('careercompass_token', sessionToken);
    localStorage.setItem('careercompass_user', JSON.stringify(activeUser));
    localStorage.setItem('futurepath_token', sessionToken);
    localStorage.setItem('futurepath_user', JSON.stringify(activeUser));

    // 3. Update active exploration profile
    saveProfile({
      name: capitalizedName,
      email: email,
    });

    // 4. Non-blocking backend notification (ignored if backend offline or no database)
    authService.login(rawId, password).catch(() => {
      // Offline mode active
    });

    return { success: true, user: activeUser, token: sessionToken };
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
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem('careercompass_token');
    localStorage.removeItem('careercompass_user');
    localStorage.removeItem('careercompass_profile');
    localStorage.removeItem('futurepath_token');
    localStorage.removeItem('futurepath_user');
    localStorage.removeItem('futurepath_profile');
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
