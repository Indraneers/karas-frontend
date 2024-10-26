import TrashIcon from "@/assets/trash.svg?react";
import { Button } from "./ui/button";

export function DeleteButton() {
  return (
    <Button className="hover:bg-transparent" variant="ghost" size="icon">
      <TrashIcon />
    </Button>
  );
}