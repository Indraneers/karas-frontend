import { deleteCategory } from "../api/category";
import { InventoryActions } from "@/components/inventory-actions";

interface CategoryActionsProps {
  categoryId: string;
}

export function CategoryActions({ categoryId }: CategoryActionsProps) {
  return (
    <InventoryActions 
      id={categoryId} 
      type="categories"
      handleDelete={deleteCategory}
    />
  );
}