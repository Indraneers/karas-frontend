import { InventoryActions } from "@/components/inventory-actions";
import { deleteUnit } from "../api/unit";

interface UnitActionsProps {
  unitId: string;
}

export function UnitActions({ unitId }: UnitActionsProps) {

  return (
    <InventoryActions 
      id={unitId}
      type="units"
      handleDelete={deleteUnit}
    />
  );
}