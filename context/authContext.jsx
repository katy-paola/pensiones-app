import { createContext, useState, useContext, useEffect } from 'react';
import { signIn } from 'next-auth/react';

const AuthContext = createContext();

export const useAuthState = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const rol = localStorage.getItem('pensiones-app-rol');
    if (rol) setRol(JSON.parse(rol));
  }, []);

  const login = (rol) => {
    localStorage.setItem('pensiones-app-rol', JSON.stringify(rol));
    setRol(rol);
    signIn('google');
  };

  const logout = () => {
    localStorage.removeItem('pensiones-app-rol');
    setRol(null);
  };

  return (
    <AuthContext.Provider value={{ rol, setRol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
