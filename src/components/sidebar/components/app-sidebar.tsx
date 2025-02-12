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

import { sidebarUserList, sidebarAdminList } from "../data/sidebar-nav-list";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarMenuBtnWrapper } from "./sidebar-menu-btn-wrapper";
import { SidebarSubmenuItemBtnWrapper } from "./sidebar-submenu-btn";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo  />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary">Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarUserList.map((item) => (
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
          <SidebarGroupLabel className="text-primary">Admin Section</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              {sidebarAdminList.map((item) => {
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
      <SidebarFooter />
    </Sidebar>
  );
}
