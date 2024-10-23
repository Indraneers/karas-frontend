import { Button } from "@/components/ui/button";
import { useLocation } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  Icon: LucideIcon;
  children: React.ReactNode;
  to: string;
  childRoutes?: RegExp[];
}

export function SidebarItem({ Icon, children, to, childRoutes }: SidebarItemProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = location.pathname === to;
  let orHasChild = false;

  if (childRoutes) {
    orHasChild = !!childRoutes.find((regex) => regex.test(location.pathname));
  }
  return (
    <Button
      variant='ghost' 
      className={
        'flex justify-start gap-2 py-5 w-full text-lg hover:bg-primary-foreground hover:text-background '
        + `${ isSelected || orHasChild ? 'text-background bg-primary-foreground' : 'text-accent' }`
      }
      onClick={() => navigate({ to })}
    >
      <span>
        <Icon />
      </span>
      {children}
    </Button>
  );
}