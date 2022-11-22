import { createContext, useState, useContext, useEffect } from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
// import { ROL } from '../model/rol.enum';
// import { useRouter } from 'next/router';

const AuthContext = createContext();

export const useAuthState = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
};

const DEFAULT_USER = {
  id: '',
  name: '',
  lastName: '',
  email: '',
  emailVerified: null,
  password: '',
  image: '',
  rol: 'STUDENT',
  homeOwner: '',
  student: '',
};

export const AuthContextProvider = ({ children }) => {
  const [rol, setRol] = useState(null);
  const [user, setUser] = useState(DEFAULT_USER);
  // const router = useRouter();
  const { data: session, status } = useSession();

  const getAllUserData = async (id) => {
    const res = await fetch(`/api/users/${id}`);
    const data = await res.json();
    setUser(data);
    setRol(data.rol);

    // if (rol === ROL.STUDENT) {
    //   const studentData = await fetch(`/api/student/${id}`);
    //   const student = await studentData.json();
    //   console.log(
    //     '🚀 ~ file: authContext.jsx ~ line 32 ~ getAllUserData ~ student',
    //     student
    //   );

    //   setUser({ ...data, student });
    // }

    // if (rol === ROL.HOMEOWNER) {
    //   const homeownerData = await fetch(`/api/home-owner/${id}`);
    //   const homeowner = await homeownerData.json();
    //   setUser({ ...data, homeowner });
    //   if (!homeowner) {
    //     router.push('/auth/new-user');
    //     console.log('no tiene datos este homeowner');
    //   }
    // }
  };

  const updateRolUser = async (id, rol) => {
    const res = await fetch(`/api/users/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rol, userId: id }),
    });
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    const rol = localStorage.getItem('pensiones-app-rol');
    if (rol) setRol(JSON.parse(rol));

    if (status === 'authenticated') {
      getAllUserData(session.user.id);
    }
  }, [session, status]);

  const login = async (rol) => {
    localStorage.setItem('pensiones-app-rol', JSON.stringify(rol));
    setRol(rol);
    await signIn('google');
    if (session?.user?.id) updateRolUser(session.user.id, rol);
  };

  const logout = () => {
    localStorage.removeItem('pensiones-app-rol');
    signOut({ callbackUrl: '/login' });
    setRol(null);
    // router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ rol, user, setUser, setRol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
