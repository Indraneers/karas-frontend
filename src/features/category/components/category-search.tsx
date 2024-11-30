import { IconInput } from "@/components/ui/icon-input";
import { Search } from "lucide-react";

export function CategorySearch({ className } : { className: string }) {
  return (
    <IconInput 
      className={className}
      icon={Search} 
      iconProps={{ behavior: 'prepend' }}  
      placeholder="Search Category" 
    />
  );
}