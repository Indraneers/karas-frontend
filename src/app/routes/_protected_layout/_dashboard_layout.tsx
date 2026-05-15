import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MainContent } from "@/components/main-content";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/components/app-sidebar";
import { Header } from "@/components/header";
export const Route = createFileRoute("/_protected_layout/_dashboard_layout")({
  component: () => <DashboardLayout />,
});

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-svh md:h-[calc(100svh-1rem)] overflow-hidden md:shadow-md">
        <Header>
          <SidebarTrigger />
        </Header>
        <MainContent className="flex-1 overflow-auto">
          <Outlet />
        </MainContent>
      </SidebarInset>
    </SidebarProvider>
  );
}
