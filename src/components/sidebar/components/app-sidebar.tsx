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
  SidebarMenuItem,
  SidebarMenuSub
} from "@/components/ui/sidebar";
import { UserProfile } from "@/features/auth/components/user-profile";
import { LogoutBtn } from "@/features/auth/components/logout-btn";

import { sidebarUserList, sidebarAdminList } from "../data/sidebar-nav-list";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarMenuBtnWrapper } from "./sidebar-menu-btn-wrapper";
import { SidebarSubmenuItemBtnWrapper } from "./sidebar-submenu-btn";
import { getAppMode } from "@/features/app-config/utils/app-mode";

export function AppSidebar() {
  const mode = getAppMode();
  const visibleUserList = sidebarUserList.filter(
    (item) => !item.hideInMode?.includes(mode)
  );
  const visibleAdminList = sidebarAdminList.filter(
    (item) => !item.hideInMode?.includes(mode)
  );

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <Logo  />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/80 uppercase tracking-[0.12em] text-[10px] font-medium">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleUserList.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuBtnWrapper
                    Icon={item.icon}
                    url={item.url}
                    childRoutes={item.childRoutes}
                  >
                    {item.title}
                  </SidebarMenuBtnWrapper>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/80 uppercase tracking-[0.12em] text-[10px] font-medium">
            Admin Section
          </SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              {visibleAdminList.map((item) => {
                if (item.children) {
                  return (
                    <Collapsible key={item.title} className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger className="w-full">
                          <SidebarMenuBtnWrapper
                            Icon={item.icon}
                            childRoutes={item.childRoutes}
                            isCollapsible
                          >
                            {item.title}
                          </SidebarMenuBtnWrapper>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <SidebarMenuSub>
                            {
                              item.children.map(r => (
                                <SidebarSubmenuItemBtnWrapper
                                  Icon={r.icon}
                                  childRoutes={r.childRoutes}
                                  url={r.url}
                                  key={r.title}
                                >
                                  {r.title}
                                </SidebarSubmenuItemBtnWrapper>
                              ))
                            }
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }
                else {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuBtnWrapper
                        Icon={item.icon}
                        url={item.url}
                        childRoutes={item.childRoutes}
                      >
                        {item.title}
                      </SidebarMenuBtnWrapper>
                    </SidebarMenuItem>
                  );
                }
              })
              }
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/60">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <UserProfile />
          </div>
          <LogoutBtn />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
