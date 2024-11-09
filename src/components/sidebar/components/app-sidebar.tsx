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
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

import { sidebarNavList } from "../data/sidebar-nav-list";
import { SidebarMenuItemWrapper } from "./sidebar-menu-item-wrapper";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarNavList.map((item) => (
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
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}