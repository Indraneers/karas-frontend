import { usePosStore } from "@/features/pos/store/pos";
import { calculateTotalCost } from "@/features/sale/utils/sale";
import { ItemCartItem } from "./item-cart-item";
import { ItemCartCurrencyInput } from "./item-cart-currency-input";
import { ServiceSelectorItem } from "@/features/service-selector/types/service-selector-item";
import { convertCurrencyToInputString, convertStringToCurrency } from "@/lib/currency";

export function ItemCartService({ service } : { service: ServiceSelectorItem }) {
  const { updateService, removeService } = usePosStore();
  const price = service.price;
  const discount = service.discount;
  const totalCost = calculateTotalCost(price, discount, 1);

  return (
    <ItemCartItem totalCost={totalCost} onClickRemove={() => removeService(service.service.id)}>
      <div className="flex flex-col gap-5">
        <div className="flex-grow pl-4 text-md self-start">
          {service.service?.name}
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
              onValueChange={(value) => updateService(service.service.id, { ...service, price: convertStringToCurrency(value || '') })}
            />
            <ItemCartCurrencyInput 
              className="w-12 min-w-12"
              prefix="-$"
              defaultValue={convertCurrencyToInputString(discount)}
              onValueChange={(value) => updateService(service.service.id, { ...service, discount: convertStringToCurrency(value || '') })}
            />
          </div>
        </div>
      </div>
    </ItemCartItem>
  );
}