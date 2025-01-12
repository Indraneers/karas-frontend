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
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";

import { sidebarUserList, sidebarAdminList } from "../data/sidebar-nav-list";
import { SidebarMenuItemWrapper } from "./sidebar-menu-item-wrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function AppSidebar() {
  const navigate = useNavigate();
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
              {sidebarAdminList.map((item) => {
                if (item.children) {
                  return (
                    <Collapsible key={item.title} className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="p-0">
                            <div
                              className="flex items-center hover:bg-accent px-2 rounded-md w-full h-8 hover:text-background transition"
                            >
                              <item.icon className="mr-2 w-4 h-4" /> Setting
                              <ChevronRight className="group-data-[state=open]/collapsible:rotate-90 ml-auto w-4 h-4" />
                            </div>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-1">
                          <SidebarMenuSub>
                            {
                              item.children.map(r => (
                                <SidebarMenuSubItem
                                  className="flex items-center gap-2 hover:bg-accent px-2 rounded-md h-8 text-sm hover:text-background transition cursor-pointer"
                                  onClick={() => navigate({ to: r.url })}
                                  key={r.title}
                                >
                                  <r.icon className="w-4 h-4" /> {r.title}
                                </SidebarMenuSubItem>
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
                      <SidebarMenuItemWrapper
                        Icon={item.icon}
                        url={item.url}
                        childRoutes={item.childRoutes}
                      >
                        {item.title}
                      </SidebarMenuItemWrapper>
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
