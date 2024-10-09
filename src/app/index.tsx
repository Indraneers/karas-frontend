import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}