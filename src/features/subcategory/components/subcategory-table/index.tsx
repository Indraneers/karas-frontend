import { cn } from "@/lib/utils";
import { DataTableAutoPagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { Subcategory } from "../../types/subcategory";

interface SubcategoryTableProps {
  className?: string;
  subcategories: Subcategory[];
  isLoading?: boolean;
}

export function SubcategoryTable({ isLoading, className, subcategories }: SubcategoryTableProps) {
  return (
    <div className={cn([
      className
    ])}>
      <DataTableAutoPagination
        isLoading={isLoading}
        columns={columns}
        data={subcategories}
      />
    </div>
  );
}