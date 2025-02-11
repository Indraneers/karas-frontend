import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout')({
  component: () => <ProtectedLayout />,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      return;
    }
  }
});

export function ProtectedLayout() {
  return (
    <Outlet />
  );
}