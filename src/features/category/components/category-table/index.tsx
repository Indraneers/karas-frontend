import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Category } from "@/features/category/types/category";

interface CategoryTablePage {
  className?: string;
  categories: Category[];
  isLoading?: boolean;
}

export function CategoryTable({ isLoading, className, categories }: CategoryTablePage) {
  return (
    <div className={cn(className)}>
      <DataTablePagination isLoading={isLoading} columns={columns} data={categories} />
    </div>
  );
}