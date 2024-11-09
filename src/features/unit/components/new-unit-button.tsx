import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export function NewUnitButton() {
  const navigate = useNavigate();
  return (
    <Button 
      onClick={() => navigate({ to: '/units/create' })}
    >
      <span><Plus className='font-bold' size={16} /></span>
      New Unit
    </Button>
  );
}