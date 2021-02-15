/* eslint-disable camelcase */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface Credentials {
  email: string;
  password: string;
}
interface AuthContextState {
  user: User;
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => void;
  updateUser: (user: User) => void;
}

interface User {
  name: string;
  email: string;
  avatar_url: string;
  id: string;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@gobarber:token');
    const stringfiedUser = localStorage.getItem('@gobarber:user');
    if (token && stringfiedUser) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(stringfiedUser) };
    }
    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('@gobarber:token', token);
    localStorage.setItem('@gobarber:user', JSON.stringify(user));
    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@gobarber:token');
    localStorage.removeItem('@gobarber:user');
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback((user: User) => {
    setData(prev => ({
      token: prev.token,
      user,
    }));
    localStorage.setItem('@gobarber:user', JSON.stringify(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
