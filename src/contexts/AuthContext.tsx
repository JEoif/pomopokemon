import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { isFirebaseConfigured } from '../firebase/config';
import type { User } from '../firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthState>({
  user: null,
  loading: false,
  isConfigured: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isFirebaseConfigured();
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: configured, // only show loading if Firebase is actually configured
    isConfigured: configured,
  });

  useEffect(() => {
    if (!configured) return;

    // Lazy-load auth listener only when Firebase is configured
    let unsubscribe: (() => void) | undefined;
    import('../firebase/auth').then(({ onAuthChange }) => {
      unsubscribe = onAuthChange((user) => {
        setState({ user, loading: false, isConfigured: true });
      });
    });

    return () => unsubscribe?.();
  }, [configured]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
