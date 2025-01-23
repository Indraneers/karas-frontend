import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { TokenPayload } from "../types/auth";

export function UserProfile() {
  const authUser = useAuthUser<TokenPayload>();

  if (!authUser) {
    return; 
  }

  return (
    <div className="flex gap-2 p-2">
      <Avatar className="rounded-lg w-8 h-8">
        <AvatarImage src="/default-avatar.jpg" alt="evan" />
        <AvatarFallback className="rounded-md">{authUser.name}</AvatarFallback>
      </Avatar>
      <div className="flex-1 grid text-left text-sm leading-tight">
        <span className="font-semibold truncate">{authUser.name}</span>
        <span className="text-xs truncate">{authUser.email}</span>
      </div>
    </div>
  );
}