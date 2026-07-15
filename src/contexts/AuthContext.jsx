import { createContext, useState, useEffect, useContext , useCallback } from 'react';
import { API_URL } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch(`${API_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await res.json();
          if (res.ok) {
            setUser({ ...data, token }); // Establish session
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error(error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    localStorage.setItem('token', data.token);
    setUser(data);
    return data;
  },[]);

  const register = useCallback(async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    localStorage.setItem('token', data.token);
    setUser(data);
    return data;
  },[]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  },[]);

  const updateProfile = useCallback(async (userData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Update failed');
    }

    setUser(prev => ({ ...prev, ...data }));
    return data;
  },[]);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  }) , [user , loading , login , register , logout , updateProfile]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
