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
            'hover:bg-muted/80 transition cursor-pointer font-medium',
            isActive ? 'bg-muted' : ''
          ])
        }
        asChild
      >
        <a href={url} target="_blank" rel="noreferrer">
          <Icon className={cn([
            "text-muted-foreground"
          ])} />
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
            'hover:bg-muted/80 transition cursor-pointer font-medium',
            isActive ? 'bg-muted' : ''
          ])
        }
        asChild
      >
        <a>
          <Icon className={cn([
            "text-muted-foreground"
          ])} />
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
          'hover:bg-muted/80 transition cursor-pointer font-medium',
          isActive ? 'bg-muted' : ''
        ])
      }
      asChild
    >
      <a>
        <Icon className={cn([
          "text-muted-foreground group-hover/item:text-primary-foreground"
        ])} />
        <span>{children}</span>
        <ChevronRight className={cn([
          "hidden group-data-[state=open]/collapsible:rotate-90 ml-auto w-4 h-4",
          isCollapsible && 'block'
        ])} />
      </a>
    </SidebarMenuButton>
  );
}