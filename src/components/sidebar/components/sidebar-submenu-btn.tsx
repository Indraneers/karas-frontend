import { SidebarMenuSubButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';
import { useSidebarContent } from "../hooks/sidebar-content";
import { useNavigate } from "@tanstack/react-router";

interface SidebarSubmenuBtnWrapperProps {
  Icon: LucideIcon;
  children: React.ReactNode;
  url?: string;
  childRoutes?: RegExp[];
}

export function SidebarSubmenuItemBtnWrapper({ Icon, children, url, childRoutes }: SidebarSubmenuBtnWrapperProps) {
  const navigate = useNavigate();
  const { isExternalLink, isActive } = useSidebarContent({ url, childRoutes });

  if (isExternalLink) {
    return (
      <SidebarMenuSubButton
        className={
          cn([
            'hover:bg-accent hover:text-background transition cursor-pointer',
            isActive ? 'bg-accent !text-background' : ''
          ])
        }
        asChild
      >
        <a href={url} target="_blank" rel="noreferrer">
          <Icon className={isActive ? 'text-background' : 'text-foreground'} />
          <span>{children}</span>
        </a>
      </SidebarMenuSubButton>
    );
  }

  if (url) {
    return (
      <SidebarMenuSubButton 
        onClick={() => navigate({ to: url })}
        className={
          cn([
            'hover:bg-accent hover:text-background transition cursor-pointer',
            isActive ? 'bg-accent text-background' : ''
          ])
        }
        asChild
      >
        <a>
          <Icon className={isActive ? '!text-background' : 'text-foreground'} />
          <span>{children}</span>
        </a>
      </SidebarMenuSubButton>
    );
  }

  return (
    <SidebarMenuSubButton
      className={
        cn([
          'hover:bg-accent hover:text-background transition cursor-pointer',
          isActive ? 'bg-accent text-background' : ''
        ])
      }
      asChild
    >
      <a>
        <Icon className={isActive ? '!text-background' : 'text-foreground'} />
        <span>{children}</span>
      </a>
    </SidebarMenuSubButton>
  );
}