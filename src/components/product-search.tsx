import { Search } from "@/components/search";

interface ProductSearchProps {
  className?: string;
}

export function ProductSearch({ className }: ProductSearchProps) {
  return (
    <Search className={className} placeholder="Search for a product" />
  );
}