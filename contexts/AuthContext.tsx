import { FC, createContext, ReactNode, useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AuthResponse } from '@shared/types/AuthResponse';
import { EMAIL_EXISTS, INVALID_CREDENTIAL, INVALID_EMAIL } from '@utils/messages';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<AuthResponse>;
  register: (email: string, password: string, username: string, photoURL: string) => Promise<AuthResponse>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  logout: async () => ({ success: false }),
  register: async () => ({ success: false }),
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (firebaseUser) => {
      setUser(firebaseUser);
      setIsAuthenticated(!!firebaseUser);
    });

    return unsubscribe;
  }, []);

  const handleFirebaseError = (error: any): string => {
    let message = error.message;
    if (message.includes('auth/invalid-email')) message = INVALID_EMAIL;
    if (message.includes('auth/invalid-credential')) message = INVALID_CREDENTIAL;
    if (message.includes('auth/email-already-in-use')) message = EMAIL_EXISTS;
    return message;
  };

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      return { success: true };
    } catch (error: any) {
      const message = handleFirebaseError(error);
      return { success: false, message, error };
    }
  };

  const logout = async (): Promise<AuthResponse> => {
    try {
      await signOut(FIREBASE_AUTH);
      return { success: true };
    } catch (error: any) {
      const message = error.message;
      return { success: false, message, error };
    }
  };

  const register = async (email: string, password: string, username: string): Promise<AuthResponse> => {
    try {
      const { user } = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      await setDoc(doc(FIRESTORE_DB, 'users', user.uid), {
        username,
        userId: user.uid,
      });
      return { success: true, data: user };
    } catch (error: any) {
      const message = handleFirebaseError(error);
      return { success: false, message, error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
