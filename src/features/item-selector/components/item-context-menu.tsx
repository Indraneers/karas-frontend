import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

/**
 * Wraps a selection card so right-clicking it opens an "Edit" action.
 * The edit sheet isn't built yet — for now the action is a placeholder toast.
 * Pass `onEdit` later to open the update sheet.
 */
export function ItemContextMenu({
  label,
  name,
  onEdit,
  children,
}: {
  label: string;
  name?: string;
  onEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem
          onSelect={() =>
            onEdit
              ? onEdit()
              : toast(`Edit ${label}${name ? ` "${name}"` : ""}`, {
                  description: "Editing isn't wired up yet — coming soon.",
                })
          }
        >
          <Pencil className="size-3.5" />
          Edit {label}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
