import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_page_layout/')({
  component: () => <Outlet />
});