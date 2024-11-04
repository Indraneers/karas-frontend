import TrashIcon from "@/assets/trash.svg?react";
import { Button } from "./ui/button";
import { MouseEventHandler } from "react";

interface DeleteButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <Button onClick={onClick} className="hover:bg-transparent" variant="ghost" size="icon">
      <TrashIcon />
    </Button>
  );
}