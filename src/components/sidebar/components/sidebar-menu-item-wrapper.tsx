import { SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useLocation } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  Icon: LucideIcon;
  children: React.ReactNode;
  url?: string;
  childRoutes?: RegExp[];
}

export function SidebarMenuItemWrapper({ Icon, children, url, childRoutes }: SidebarItemProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = location.pathname === url;
  let orHasChild = false;

  if (childRoutes) {
    orHasChild = !!childRoutes.find((regex) => regex.test(location.pathname));
  }

  function validateText(string: string) {
    return /(http(s?)):\/\//i.test(string);
  }

  if (url && validateText(url)) {
    return (
      <SidebarMenuButton 

        className={
          cn([
            'hover:bg-accent hover:text-background transition cursor-pointer',
            (isSelected || orHasChild) ? 'bg-accent text-background' : ''
          ])
        }
        asChild
      >
        <a href={url} target="_blank" rel="noreferrer">
          <Icon />
          <span>{children}</span>
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
            'hover:bg-accent hover:text-background transition cursor-pointer',
            (isSelected || orHasChild) ? 'bg-accent text-background' : ''
          ])
        }
        asChild
      >
        <a>
          <Icon />
          <span>{children}</span>
        </a>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuButton 
      className={
        cn([
          'hover:bg-accent hover:text-background transition cursor-pointer',
          (isSelected || orHasChild) ? 'bg-accent text-background' : ''
        ])
      }
      asChild
    >
      <a>
        <Icon />
        <span>{children}</span>
      </a>
    </SidebarMenuButton>
  );
}