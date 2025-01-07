import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from "@/components/ui/sidebar";

import { sidebarUserList, sidebarAdminList } from "../data/sidebar-nav-list";
import { SidebarMenuItemWrapper } from "./sidebar-menu-item-wrapper";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo  />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarUserList.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuItemWrapper
                    Icon={item.icon}
                    url={item.url}
                    childRoutes={item.childRoutes}
                  >
                    {item.title}
                  </SidebarMenuItemWrapper>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Section</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              {sidebarAdminList.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuItemWrapper
                    Icon={item.icon}
                    url={item.url}
                    childRoutes={item.childRoutes}
                  >
                    {item.title}
                  </SidebarMenuItemWrapper>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
