import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface CategoryActionsProps {
  categoryId: string;
}

export function CategoryActions({ categoryId }: CategoryActionsProps) {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 w-8 h-8">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Category Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigate({ to: '/categories/edit/' + categoryId })}
        >
          <Edit />
          <span>Edit</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}