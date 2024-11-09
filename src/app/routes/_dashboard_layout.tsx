import { createFileRoute, Outlet } from '@tanstack/react-router';
import { MainContent } from '@/components/main-content';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/components/app-sidebar';

export const Route = createFileRoute('/_dashboard_layout')({
  component: () => <DashboardLayout />
});

function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className='grid grid-cols-6 bg-background w-full h-screen font-body'>
        <AppSidebar />
        <div className='col-span-5 w-full'>
          <MainContent isContainer={true}>
            <Outlet />
          </MainContent>
        </div>
      </div>
    </SidebarProvider>
  );
}