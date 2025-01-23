
// import { usePosStore } from "@/features/pos/store/pos";
// import { PrefixedCurrencyInput } from "../../../components/prefixed-currency-input";
// import { convertStringToCurrency } from "@/lib/currency";

// export function ServiceEditable({ id, defaultValue = "", accessorKey }: { id: string, defaultValue: string | number | undefined, accessorKey: string }) {
//   const { services, updateService } = usePosStore();
//   const service = services.find((s) => s.service.id === id);
//   if (!service) {
//     return null;
//   }
//   return (
//     <PrefixedCurrencyInput
//       defaultValue={defaultValue}
//       onValueChange={(value) => updateService(
//         id,
//         {
//           ...service,
//           [accessorKey]: value ? convertStringToCurrency(value) : ''
//         }
//       )}
//       disableGroupSeparators
//     />
//   );
// }