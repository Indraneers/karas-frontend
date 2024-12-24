import { createFileRoute, Outlet } from '@tanstack/react-router';
import { MainContent } from '@/components/main-content';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/components/app-sidebar';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout')({
  component: () => <DashboardLayout />
});

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </SidebarProvider>
  );
}