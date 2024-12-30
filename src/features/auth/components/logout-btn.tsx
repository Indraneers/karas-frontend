import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useAuthStore } from "../store/auth";

export function LogoutBtn() {
  const { setAuth } = useAuthStore();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={() => {
        signOut();
        setAuth(false);
        navigate({
          to: '/login',
          search: {
            redirect: location.href
          }
        });
      }}
    >
      <LogOut />
    </Button>
  );
}