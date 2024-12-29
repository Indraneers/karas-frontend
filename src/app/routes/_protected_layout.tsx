import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout')({
  component: () => <ProtectedLayout />,
  beforeLoad: async ({ context, location }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href
        }
      });
    }
  }
});

export function ProtectedLayout() {
  return (
    <Outlet />
  );
}