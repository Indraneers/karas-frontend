import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout')({
  component: () => <DashboardLayout />
});

function DashboardLayout() {
  return (
    <div className='grid grid-cols-6'>
      <div>
        sidebar
      </div>
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}