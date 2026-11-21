import React, { createContext, useContext, useState } from 'react';
import { UserProfile } from '../../types';
import { authService } from '../../services/auth.service';
import { store } from '../../lib/store';

interface AuthContextType {
  user: UserProfile | null;
  location: string;
  setLocation: (loc: string) => void;
  login: (email: string, password: string) => UserProfile;
  register: (params: { fullName: string; email: string; phone: string }) => UserProfile;
  updateProfile: (updates: { full_name: string; phone: string }) => UserProfile | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => authService.getCurrentUser());
  const [location, setLocationState] = useState<string>(() => store.getLocation());

  const setLocation = (loc: string) => {
    const clean = loc.trim() || 'Bengaluru';
    store.setLocation(clean);
    setLocationState(clean);
  };

  const login = (email: string, password: string) => {
    const loggedIn = authService.login(email, password);
    setUser(loggedIn);
    return loggedIn;
  };

  const register = (params: { fullName: string; email: string; phone: string }) => {
    const registered = authService.register(params);
    setUser(registered);
    return registered;
  };

  const updateProfile = (updates: { full_name: string; phone: string }) => {
    const updated = authService.updateProfile(updates);
    setUser(updated);
    return updated;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        location,
        setLocation,
        login,
        register,
        updateProfile,
        logout
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
