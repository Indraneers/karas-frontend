import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { Toaster } from '@/components/ui/sonner';

import AuthProvider from 'react-auth-kit';
import { store, useAuthStore } from '@/features/auth/store/auth';
import { getRefreshToken, requestWithRefreshToken } from '@/features/auth/utils/auth';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '@/features/auth/types/auth';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

const router = createRouter({ 
  routeTree, 
  context: {
    auth: undefined!
  }
});

const queryClient = new QueryClient();

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router;
  }
}

function AuthorizedRouter({ children }: { children: React.ReactNode}) {
  const { auth, setAuth } = useAuthStore();
  const signIn = useSignIn();

  const refreshToken = getRefreshToken();

  if (!auth && refreshToken) {
    requestWithRefreshToken(refreshToken)
      .then((response) => {
        if (response.type === 'success') {
          const decodedToken = jwtDecode<TokenPayload>(response.access_token);
              
          const signInSuccess = signIn({
            auth: {
              token: response.access_token,
              type: 'Bearer'
            },
            refresh: response.refresh_token,
            userState: {
              name: decodedToken.name,
              email: decodedToken.email,
              userId: decodedToken.sub
            }
          });
          
          if (signInSuccess) {
            setAuth(true);
          }
        }
        else if (response.type === 'failed') {
          setAuth(false);
        }
      });
  }

  return (
    <>
      <RouterProvider router={router} context={{ auth }} />
      {children}
    </>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider store={store}>
        <AuthorizedRouter>
          <Toaster richColors />
        </AuthorizedRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}