import { SidebarMenuSubButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useSidebarContent } from "../hooks/sidebar-content";
import { useNavigate } from "@tanstack/react-router";

interface SidebarSubmenuBtnWrapperProps {
  Icon: LucideIcon;
  children: React.ReactNode;
  url?: string;
  childRoutes?: RegExp[];
}

export function SidebarSubmenuItemBtnWrapper({
  Icon,
  children,
  url,
  childRoutes
}: SidebarSubmenuBtnWrapperProps) {
  const navigate = useNavigate();
  const { isExternalLink, isActive } = useSidebarContent({ url, childRoutes });

  const anchorProps = isExternalLink
    ? { href: url, target: "_blank" as const, rel: "noreferrer" }
    : url
      ? { onClick: () => navigate({ to: url }) }
      : {};

  return (
    <SidebarMenuSubButton
      asChild
      className={cn(
        "h-6 gap-1.5 px-2 cursor-pointer text-[12.5px] text-sidebar-foreground/70 transition-colors",
        "hover:bg-sidebar-accent/70 hover:text-sidebar-foreground",
        isActive && "bg-sidebar-accent/70 text-sidebar-foreground"
      )}
    >
      <a {...anchorProps}>
        <Icon strokeWidth={2} className="size-4" />
        <span>{children}</span>
      </a>
    </SidebarMenuSubButton>
  );
}
