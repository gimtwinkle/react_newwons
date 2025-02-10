import { app } from '@/firebase';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

// AuthContext의 타입 정의
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

// Context 생성 및 기본값 설정
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

// AuthProvider props 타입 정의
interface AuthProviderProps {
  children: React.ReactNode;
}

// AuthProvider 컴포넌트
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);

    setIsLoading(true); // 명시적으로 로딩 상태 시작

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setIsLoading(false);
      },
      (error) => {
        console.error('Auth state change error:', error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 커스텀 훅: 다른 컴포넌트에서 인증 상태를 쉽게 사용할 수 있도록 함
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
