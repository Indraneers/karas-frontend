import { Search } from "@/components/search";

interface UnitSearchProps {
  className?: string;
}

export function UnitSearch({ className }: UnitSearchProps) {
  return (
    <Search className={className} placeholder="Search for a unit" />
  );
}