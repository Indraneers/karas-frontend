import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, hasAuthParams, useAuth } from "react-oidc-context";

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { Toaster } from '@/components/ui/sonner';
import { onSigninCallback, userManager } from '@/features/auth/config/oidc-config';
import { useEffect, useState } from 'react';
import { LoadingPage } from '@/components/loading-page';

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router;
  }
}

const router = createRouter({ 
  routeTree, 
  context: {
    auth: undefined!
  }
});

const queryClient = new QueryClient();

function AuthorizedRouter({ children }: { children: React.ReactNode}) {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  useEffect(() => {
    if (!(hasAuthParams() || auth.isAuthenticated || auth.activeNavigator || auth.isLoading || hasTriedSignin)) {
      void auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  if (!auth.isAuthenticated) {
    return (
      <LoadingPage />
    );
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
      <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
        <AuthorizedRouter>
          <Toaster richColors />
        </AuthorizedRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}