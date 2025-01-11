import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { RefreshCcw } from "lucide-react";

export function RestockButton() {
  const navigate = useNavigate();
  return (
    <Button 
      className="border-primary hover:bg-primary text-primary hover:text-white" 
      variant='outline'
      onClick={() => navigate({ to: '/inventory/restock' })}
    >
      <RefreshCcw />
      <span>
        Restock
      </span>
    </Button>
  );
}