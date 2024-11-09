import { IconInput } from "@/components/ui/icon-input";
import { Search } from "lucide-react";

export function CategorySearch() {
  return (
    <IconInput icon={Search} iconProps={{ behavior: 'prepend' }}  placeholder="Search Category" />
  );
}