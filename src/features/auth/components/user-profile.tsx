import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useAuth } from "react-oidc-context";

export function UserProfile() {
  const auth = useAuth();
  const user = auth.user?.profile;

  return (
    <div className="flex gap-2 p-2">
      <Avatar className="rounded-lg w-8 h-8">
        <AvatarImage src="/default-avatar.jpg" alt="evan" />
        <AvatarFallback className="rounded-md">{user?.name}</AvatarFallback>
      </Avatar>
      <div className="flex-1 grid text-sm text-left leading-tight">
        <span className="font-semibold truncate">{user?.name}</span>
        <span className="text-xs truncate">{user?.email}</span>
      </div>
    </div>
  );
}