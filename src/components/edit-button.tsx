import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";

export function EditButton({ to, className }: { to: string, className?: string }) {
  const navigate = useNavigate();
  return (
    <Button
      className={cn([
        "w-6 h-6",
        className
      ])}
      variant='ghost' 
      onClick={(e) => {
        e.stopPropagation();
        navigate({ to });
      }}
      size="icon"
    >
      <Edit />
    </Button>
  );
}