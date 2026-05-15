import { SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, LucideIcon } from "lucide-react";
import { useSidebarContent } from "../hooks/sidebar-content";

interface SidebarMenuBtnWrapperProps {
  Icon: LucideIcon;
  children: React.ReactNode;
  url?: string;
  childRoutes?: RegExp[];
  isCollapsible?: boolean;
}

export function SidebarMenuBtnWrapper({
  Icon,
  children,
  url,
  childRoutes,
  isCollapsible
}: SidebarMenuBtnWrapperProps) {
  const navigate = useNavigate();
  const { isExternalLink, isActive } = useSidebarContent({ url, childRoutes });

  const anchorProps = isExternalLink
    ? { href: url, target: "_blank" as const, rel: "noreferrer" }
    : url
      ? { onClick: () => navigate({ to: url }) }
      : {};

  return (
    <SidebarMenuButton
      asChild
      className={cn(
        "group/item h-7 gap-1.5 px-2 py-1 cursor-pointer text-[13px] font-medium transition-colors",
        "text-sidebar-foreground/75 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground",
        isActive && "bg-sidebar-accent text-sidebar-foreground"
      )}
    >
      <a {...anchorProps}>
        <Icon
          strokeWidth={2}
          className="size-4 text-sidebar-foreground/60 group-hover/item:text-sidebar-foreground transition-colors"
        />
        <span className="group-data-[collapsible=icon]:hidden">{children}</span>
        <ChevronRight
          className={cn(
            "hidden ml-auto size-4 text-sidebar-foreground/40 transition-transform group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden",
            isCollapsible && "block"
          )}
        />
      </a>
    </SidebarMenuButton>
  );
}
