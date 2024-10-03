import { MainContent } from '@/components/main-content';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_page_layout')({
  component: () => <PageLayout />
});

function PageLayout() {
  return (
    <div className='bg-background h-screen font-body'>
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
}