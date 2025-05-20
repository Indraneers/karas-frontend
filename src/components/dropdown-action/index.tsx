import { EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DropdownActionItem } from "@/types/context-options";

export function DropdownAction<TData>({
  label,
  items,
  value
} : { label: string, items: DropdownActionItem<TData>[], value: TData }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="hover:bg-transparent focus-visible:ring-0 w-4 h-4 hover:text-primary" size='icon' variant='ghost'>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {
            items.map(i => 
              <DropdownMenuItem className="cursor-pointer" key={i.key} onClick={(e) => {
                e.stopPropagation();
                i.onClick(value);
              }}>
                {i.content}
              </DropdownMenuItem>
            )
          }
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}