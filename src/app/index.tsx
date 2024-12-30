import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { Toaster } from '@/components/ui/sonner';

import AuthProvider from 'react-auth-kit';
import { store, useAuthStore } from '@/features/auth/store/auth';

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
  const { auth } = useAuthStore();
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