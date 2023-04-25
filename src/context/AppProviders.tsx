import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthProvider from './AuthProvider';
import AppThemeProvider from './AppThemeProvider';
import AppStateProvider from './AppStateProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

interface Props {
  children: ReactNode;
}

function AppProviders({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppThemeProvider>
          <AppStateProvider>
            <AuthProvider>{children}</AuthProvider>
          </AppStateProvider>
        </AppThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default AppProviders;
