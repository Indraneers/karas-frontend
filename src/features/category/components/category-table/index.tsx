import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Category } from "@/types/category";

interface CategoryTablePage {
  className?: string;
  categories: Category[]
}

export function CategoryTable({ className, categories }: CategoryTablePage) {
  return (
    <div className={cn(className)}>
      <DataTablePagination columns={columns} data={categories} />
    </div>
  );
}