import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { resetJokeListParams, useAppState } from './AppStateProvider';

const AUTH_TOKEN_STORAGE_KEY = '__auth_token__';

interface AuthContextValue {
  authToken: string | null;
  login: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface Props {
  children: ReactNode;
}

function AuthProvider({ children }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem(AUTH_TOKEN_STORAGE_KEY),
  );
  const [, dispatch] = useAppState();

  const login = useCallback(
    () =>
      new Promise<void>((resolve) => {
        // simulate API request
        setTimeout(() => {
          resolve();
        }, 300);
      }).then(() => {
        const token = 'some_token';
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
        setAuthToken(token);
      }),
    [],
  );

  const logout = useCallback(async () => {
    setAuthToken(null);
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    resetJokeListParams(dispatch);
    queryClient.removeQueries();
    navigate('/jokes');
  }, [dispatch, navigate, queryClient]);

  const value = useMemo<AuthContextValue>(
    () => ({
      authToken,
      login,
      logout,
      isAuthenticated: Boolean(authToken),
    }),
    [authToken, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
