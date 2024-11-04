import { Search } from "@/components/search";

interface CategorySearchProps {
  className?: string;
}

export function CategorySearch({ className }: CategorySearchProps) {
  return (
    <Search className={className} placeholder="Search for a category" />
  );
}