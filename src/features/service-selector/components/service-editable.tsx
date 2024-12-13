
import { usePosStore } from "@/features/pos/store/pos";
import { PrefixedCurrencyInput } from "../../../components/prefixed-currency-input";

export function ServiceEditable({ id, value = "", accessorKey }: { id: string, value: string | number | undefined, accessorKey: string }) {
  const { services, updateService } = usePosStore();
  const service = services.find((s) => s.service.id === id);
  if (!service) {
    return null;
  }
  return (
    <PrefixedCurrencyInput
      value={value} 
      onValueChange={(value) => updateService({
        ...service,
        [accessorKey]: value
      })}
      disableGroupSeparators
    />
  );
}