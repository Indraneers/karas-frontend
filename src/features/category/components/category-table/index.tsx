import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { Category } from "@/features/category/types/category";
import { DataTableAutoPagination } from "@/components/data-table-pagination";

interface CategoryTablePage {
  className?: string;
  categories: Category[];
  isLoading?: boolean;
}

export function CategoryTable({ isLoading, className, categories }: CategoryTablePage) {
  return (
    <div className={cn(className)}>
      <DataTableAutoPagination isLoading={isLoading} columns={columns} data={categories} />
    </div>
  );
}