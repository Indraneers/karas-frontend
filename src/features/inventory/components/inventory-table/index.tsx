import { cn } from "@/lib/utils";
import { products } from "../../data/sample-products";
import { columns } from "./columns";
import { DataTable } from "./components/data-table";

interface InventoryTablePage {
  className?: string;
}

export function InventoryTable({ className }: InventoryTablePage) {
  return (
    <div className={cn(className)}>
      <DataTable columns={columns} data={products} />
    </div>
  );
}