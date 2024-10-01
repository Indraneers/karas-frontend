import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  Icon: LucideIcon;
  children: React.ReactNode;
}

export function SidebarItem({ Icon, children }: SidebarItemProps) {
  return (
    <Button 
      variant='ghost' 
      className="flex justify-start gap-2 py-5 w-full text-accent text-lg"
    >
      <span>
        <Icon />
      </span>
      {children}
    </Button>
  );
}