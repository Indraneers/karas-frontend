import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "react-oidc-context";

export function UserProfile() {
  const auth = useAuth();
  const user = auth.user?.profile;
  const initials = (user?.name ?? user?.email ?? "?")
    .toString()
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-2 min-w-0">
      <Avatar className="rounded-md w-7 h-7 shrink-0">
        <AvatarImage src="/default-avatar.jpg" alt={user?.name ?? ""} />
        <AvatarFallback className="rounded-md text-xs">{initials}</AvatarFallback>
      </Avatar>
      <div className="grid min-w-0 text-left leading-tight">
        <span className="truncate text-sm font-medium text-sidebar-foreground">
          {user?.name}
        </span>
        <span className="truncate text-xs text-sidebar-foreground/60">
          {user?.email}
        </span>
      </div>
    </div>
  );
}
