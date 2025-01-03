import { cn } from "@/lib/utils";
import { Subcategory } from "../../types/subcategory";
import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";

interface SubcategoryTableProps {
  className?: string;
  subcategories: Subcategory[]
}

export function SubcategoryTable({ className, subcategories }: SubcategoryTableProps) {
  return (
    <div className={cn([
      className
    ])}>
      <DataTablePagination 
        columns={columns}
        data={subcategories}
      />
    </div>
  );
}