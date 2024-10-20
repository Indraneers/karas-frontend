import { Editable } from "@/components/editable";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";

export function VehicleSelect() {
  return (
    <Editable>
      <Select>
        <SelectTrigger>
          <SelectValue className="font-normal text-xs" placeholder="2010 Acura" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2010_Acura">2010 Acura</SelectItem>
        </SelectContent>
      </Select>
    </Editable>
  );
}