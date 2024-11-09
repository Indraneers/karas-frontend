import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export function NewCategoryButton() {
  const navigate = useNavigate();
  return (
    <Button 
      onClick={() => navigate({ to: '/categories/create' })}
    >
      <span><Plus className='font-bold' size={16} /></span>
      New Category
    </Button>
  );
}