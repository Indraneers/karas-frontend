import { SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useLocation } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  Icon: LucideIcon;
  children: React.ReactNode;
  url: string;
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
  
  return (
    <SidebarMenuButton 
      onClick={() => navigate({ to: url })}
      className={
        cn([
          'hover:bg-foreground hover:text-background transition',
          (isSelected || orHasChild) ? 'bg-foreground text-background' : ''
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