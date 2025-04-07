import { usePosStore } from "@/features/pos/store/pos";
import { calculateTotalCost } from "@/features/sale/utils/sale";
import { ItemCartItem } from "./item-cart-item";
import { ItemCartCurrencyInput } from "./item-cart-currency-input";
import { MaintenanceService } from "@/features/maintenance/types/maintenance-service";

export function ItemCartService({ maintenanceService } : { maintenanceService: MaintenanceService }) {
  const { updateService, removeService } = usePosStore();
  const price = maintenanceService.price;
  const discount = maintenanceService.discount;
  const totalCost = calculateTotalCost(price, discount, 1);

  return (
    <ItemCartItem totalCost={totalCost} onClickRemove={() => removeService(maintenanceService.service.id)}>
      <div className="flex flex-col gap-3">
        <div className="flex-grow self-start font-medium text-md">
          {maintenanceService.service?.name}
        </div>
        <div className="flex justify-between">
          <div className="self-end text-foreground/50 text-xs">
            Service Check
          </div>
          <div className="flex gap-2">
            <ItemCartCurrencyInput 
              className="w-14"
              prefix="$"
              defaultValue={price}
              onValueChange={(value) => updateService(maintenanceService.service.id, { ...maintenanceService, price: value })}
            />
            <ItemCartCurrencyInput 
              className="w-14"
              prefix="-$"
              defaultValue={discount}
              onValueChange={(value) => updateService(maintenanceService.service.id, { ...maintenanceService, discount: value })}
            />
          </div>
        </div>
      </div>
    </ItemCartItem>
  );
}