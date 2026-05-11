import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('shopverse_user');
    const storedToken = localStorage.getItem('shopverse_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Demo login - replace with real API
      const demoUsers = {
        'admin@shopverse.com': { name: 'Admin User', email: 'admin@shopverse.com', role: 'admin' },
        'user@shopverse.com': { name: 'John Doe', email: 'user@shopverse.com', role: 'user' },
      };

      const foundUser = demoUsers[email];
      if (foundUser && password === 'password123') {
        const token = 'demo_token_' + Date.now();
        setUser(foundUser);
        localStorage.setItem('shopverse_user', JSON.stringify(foundUser));
        localStorage.setItem('shopverse_token', token);
        toast.success(`Welcome back, ${foundUser.name}!`);
        return { success: true, user: foundUser };
      }

      // Try any email/password combo for demo
      if (email && password.length >= 6) {
        const newUser = { name: email.split('@')[0], email, role: 'user' };
        const token = 'demo_token_' + Date.now();
        setUser(newUser);
        localStorage.setItem('shopverse_user', JSON.stringify(newUser));
        localStorage.setItem('shopverse_token', token);
        toast.success(`Welcome, ${newUser.name}!`);
        return { success: true, user: newUser };
      }

      toast.error('Invalid credentials');
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      toast.error('Login failed');
      return { success: false, message: error.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const newUser = { name, email, role: 'user' };
      const token = 'demo_token_' + Date.now();
      setUser(newUser);
      localStorage.setItem('shopverse_user', JSON.stringify(newUser));
      localStorage.setItem('shopverse_token', token);
      toast.success('Account created successfully!');
      return { success: true, user: newUser };
    } catch (error) {
      toast.error('Signup failed');
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shopverse_user');
    localStorage.removeItem('shopverse_token');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
