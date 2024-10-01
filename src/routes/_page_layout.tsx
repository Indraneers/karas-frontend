import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_page_layout')({
  component: () => <PageLayout />
});

function PageLayout() {
  return (
    <div className='bg-background font-body'>
      <Outlet />
    </div>
  );
}