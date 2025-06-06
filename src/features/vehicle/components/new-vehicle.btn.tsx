import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export function NewVehicleButton() {
  const navigate = useNavigate();
  return (
    <Button 
      onClick={() => navigate({ to: 'create' })}
    >
      <span><Plus className='font-bold' size={16} /></span>
      New Vehicle
    </Button>
  );
}