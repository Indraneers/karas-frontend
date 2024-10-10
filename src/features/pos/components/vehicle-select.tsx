import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { Pencil } from "lucide-react";

export function VehicleSelect() {
  return (
    <div className="flex gap-1 border-[1px] border-primary-foreground p-[2px] rounded-md self-start">
      <Pencil className="ml-1" size={16} color="black" />
      <Select>
        <SelectTrigger className="bg-primary-foreground text-background">

          <SelectValue className="font-normal text-xs" placeholder="2010 Acura" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2010_Acura">2010 Acura</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}