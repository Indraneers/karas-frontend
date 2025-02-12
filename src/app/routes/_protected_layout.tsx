import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout')({
  component: () => <ProtectedLayout />
});

export function ProtectedLayout() {
  return (
    <Outlet />
  );
}