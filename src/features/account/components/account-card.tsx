import { IconButton } from "@/components/icon-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings } from "lucide-react";


export interface AccountCardProps {
  username: string;
  src: string;
}

export function AccountCard({ username, src }: AccountCardProps) {
  return (
    <div className="items-center gap-5 grid grid-cols-[auto,1fr] px-4 py-6">
      <Avatar className="border-primary-foreground border">
        <AvatarImage src={src} />
        <AvatarFallback>{username}</AvatarFallback>
      </Avatar>
      <div className="py-1 h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="opacity-50 text-primary-foreground text-sm">Welcome Back,</div>
          <div className="grid grid-cols-[1fr,auto] font-semibold text-xl">
            <div>{username}</div>
            <div>
              <IconButton className="border-gray-500 px-2 py-1 rounded-md h-auto">
                <Settings size={12} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}