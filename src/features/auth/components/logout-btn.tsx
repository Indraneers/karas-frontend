import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "react-oidc-context";
export function LogoutBtn() {
  const auth = useAuth();
  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={() => {
        void auth.signoutRedirect();
      }}
    >
      <LogOut />
    </Button>
  );
}