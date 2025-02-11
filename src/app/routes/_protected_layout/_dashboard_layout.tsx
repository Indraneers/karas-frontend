import { createFileRoute, Outlet } from '@tanstack/react-router';
import { MainContent } from '@/components/main-content';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/components/app-sidebar';
import { Header } from '@/components/header';
import { Separator } from '@/components/ui/separator';
import { UserProfile } from '@/features/auth/components/user-profile';
import { LogoutBtn } from '@/features/auth/components/logout-btn';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout')({
  component: () => <DashboardLayout />
});

function DashboardLayout() {  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='z-10 flex flex-col bg-background'>
        <Header className='z-10 bg-background'>
          <SidebarTrigger />
          <div className='flex justify-end items-center gap-4 w-full h-12'>
            <UserProfile />
            <Separator className='h-8' orientation='vertical' />
            <LogoutBtn />
          </div>
        </Header>      
        <MainContent>
          <Outlet />
        </MainContent>
      </SidebarInset>
    </SidebarProvider>
  );
}