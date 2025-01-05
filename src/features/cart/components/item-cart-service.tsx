import { usePosStore } from "@/features/pos/store/pos";
import { calculateTotalCost } from "@/features/sale/utils/sale";
import { ItemCartItem } from "./item-cart-item";
import { ItemCartCurrencyInput } from "./item-cart-currency-input";
import { convertCurrencyToInputString, convertStringToCurrency } from "@/lib/currency";
import { MaintenanceService } from "@/features/maintenance/types/maintenance-service";

export function ItemCartService({ maintenanceService } : { maintenanceService: MaintenanceService }) {
  const { updateService, removeService } = usePosStore();
  const price = maintenanceService.price;
  const discount = maintenanceService.discount;
  const totalCost = calculateTotalCost(price, discount, 1);

  return (
    <ItemCartItem totalCost={totalCost} onClickRemove={() => removeService(maintenanceService.service.id)}>
      <div className="flex flex-col gap-5">
        <div className="flex-grow pl-4 text-md self-start">
          {maintenanceService.service?.name}
        </div>
        <div className="flex justify-between">
          <div className="text-foreground/50 text-xs self-end">
            Service Check
          </div>
          <div className="flex gap-2">
            <ItemCartCurrencyInput 
              className="w-12 min-w-12"
              prefix="$"
              defaultValue={convertCurrencyToInputString(price)}
              onValueChange={(value) => updateService(maintenanceService.service.id, { ...maintenanceService, price: convertStringToCurrency(value || '') })}
            />
            <ItemCartCurrencyInput 
              className="w-12 min-w-12"
              prefix="-$"
              defaultValue={convertCurrencyToInputString(discount)}
              onValueChange={(value) => updateService(maintenanceService.service.id, { ...maintenanceService, discount: convertStringToCurrency(value || '') })}
            />
          </div>
        </div>
      </div>
    </ItemCartItem>
  );
}