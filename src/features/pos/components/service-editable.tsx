
import { usePosStore } from "../store/pos";
import { CurrencyInput } from "@/components/currency-input";

export function ServiceEditable({ id, value, accessorKey }: { id: string, value: number | undefined, accessorKey: string }) {
  const { services, setServices } = usePosStore();
  return (
    <CurrencyInput
      value={value} 
      onChange={(e) => setServices(
        services.map((a) => {
          // since this is likely to be a currency variable,
          // we wish to take the value and multiply it by 100
          if (a.autoService.id === id) {
            return {
              ...a,
              [accessorKey]: Number(e.target.value) * 100
            };
          }
          return a;
        })
      )}
    />
  );
}