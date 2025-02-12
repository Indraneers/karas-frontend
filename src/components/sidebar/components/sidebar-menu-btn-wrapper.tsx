import { SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, LucideIcon } from 'lucide-react';
import { useSidebarContent } from "../hooks/sidebar-content";

interface SidebarMenuBtnWrapperProps {
  Icon: LucideIcon;
  children: React.ReactNode;
  url?: string;
  childRoutes?: RegExp[];
  isCollapsible?: boolean;
}

export function SidebarMenuBtnWrapper({ Icon, children, url, childRoutes, isCollapsible }: SidebarMenuBtnWrapperProps) {
  const navigate = useNavigate();
  const { isExternalLink, isActive } = useSidebarContent({ url, childRoutes });

  if (isExternalLink) {
    return (
      <SidebarMenuButton 

        className={
          cn([
            'hover:text-accent transition cursor-pointer',
            isActive ? 'text-accent' : ''
          ])
        }
        asChild
      >
        <a href={url} target="_blank" rel="noreferrer">
          <Icon />
          <span>{children}</span>
          <ChevronRight className={cn([
            "hidden group-data-[state=open]/collapsible:rotate-90 ml-auto w-4 h-4",
            isCollapsible && 'block'
          ])} />
        </a>
      </SidebarMenuButton>
    );
  }

  if (url) {
    return (
      <SidebarMenuButton 
        onClick={() => navigate({ to: url })}
        className={
          cn([
            'hover:text-accent transition cursor-pointer',
            isActive ? 'text-accent' : ''
          ])
        }
        asChild
      >
        <a>
          <Icon />
          <span>{children}</span>
          <ChevronRight className={cn([
            "hidden group-data-[state=open]/collapsible:rotate-90 ml-auto w-4 h-4",
            isCollapsible && 'block'
          ])} />
        </a>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuButton 
      className={
        cn([
          'hover:text-accent transition cursor-pointer'
        ])
      }
      asChild
    >
      <a>
        <Icon />
        <span>{children}</span>
        <ChevronRight className={cn([
          "hidden group-data-[state=open]/collapsible:rotate-90 ml-auto w-4 h-4",
          isCollapsible && 'block'
        ])} />
      </a>
    </SidebarMenuButton>
  );
}