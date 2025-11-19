import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin } from '../services/authService.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => token ? { email: localStorage.getItem('email') } : null);

  const login = async (email, password) => {
    const result = await apiLogin(email, password);
    setToken(result.token);
    setUser({ email });
    localStorage.setItem('token', result.token);
    localStorage.setItem('email', email);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  const value = { token, user, login, logout, isAuthenticated: !!token };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
