import { IconInput } from "@/components/ui/icon-input";
import { Search } from "lucide-react";

export function UnitSearch() {
  return (
    <IconInput icon={Search} iconProps={{ behavior: 'prepend' }}  placeholder="Search Units" />
  );
}