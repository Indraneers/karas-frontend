import { deleteProduct } from "../api/product";
import { InventoryActions } from "@/components/inventory-actions";

interface ProductActionsProps {
  productId: string;
}

export function ProductActions({ productId }: ProductActionsProps) {
  return (
    <InventoryActions 
      id={productId}
      type="products"
      handleDelete={deleteProduct}
    />
  );
}