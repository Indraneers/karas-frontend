import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_page_layout')({
  component: () => <PageLayout />
});

function PageLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}