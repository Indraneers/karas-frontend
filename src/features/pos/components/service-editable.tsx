
import { usePosStore } from "../store/pos";
import { PrefixedCurrencyInput } from "../../../components/prefixed-currency-input";

export function ServiceEditable({ id, value = "", accessorKey }: { id: string, value: string | number | undefined, accessorKey: string }) {
  const { services, setServices } = usePosStore();
  return (
    <PrefixedCurrencyInput
      value={value} 
      onValueChange={(value) => setServices(
        services.map((a) => {
          // since this is likely to be a currency variable,
          // we wish to take the value and multiply it by 100
          if (a.autoService.id === id) {
            return {
              ...a,
              [accessorKey]: value
            };
          }
          return a;
        })
      )}
      disableGroupSeparators
    />
  );
}