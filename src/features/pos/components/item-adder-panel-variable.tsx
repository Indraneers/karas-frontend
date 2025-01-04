import { FormEvent } from "react";
import { UnderlineCurrencyInput } from "./underline-currency-input";
import { UnderlineInput } from "./underline-input";
import { Unit } from "@/features/unit/types/unit";
import { convertBaseUnitQuantityToQuantity, convertQuantityToBaseUnitQuantity } from "@/features/unit/util/convert";
import { ProductRequestDto } from "@/features/product/types/product.dto";

interface ItemAdderPanelVariableProps {
  getterList: string[];
  setterList: React.Dispatch<React.SetStateAction<string>>[];
  refList: React.RefObject<HTMLInputElement>[];
  setCurrentElementIndex:  React.Dispatch<React.SetStateAction<number>>;
  isBaseUnit: boolean;
  product: ProductRequestDto;
  unit: Unit;
}

export function ItemAdderPanelVariable({
  getterList,
  setterList,
  refList,
  isBaseUnit,
  setCurrentElementIndex,
  product,
  unit
}: ItemAdderPanelVariableProps) {
  function onValueChange(value: string | undefined, setter: (id: string) => void) {
    setter(value || '');
  }

  function handleQtyInput(event: FormEvent<HTMLInputElement>) {
    const qty = convertQuantityToBaseUnitQuantity(unit.toBaseUnit, Number(event.currentTarget.value));
    setterList[2](qty.toString());
  }
  
  function handleBaseUnitQtyInput(event: FormEvent<HTMLInputElement>) {
    setterList[2](Number(event.currentTarget.value).toString());
  }


  return (
    <div>
      <div className="flex gap-2 text-xl">
        <div className="flex items-baseline gap-2">
          <span>$</span>
          <UnderlineCurrencyInput 
            className="w-full"
            value={getterList[0]}
            onValueChange={(value) => onValueChange(value, setterList[0])}
            onFocus={() => setCurrentElementIndex(0)} 
            ref={refList[0]} 
          />
          <div className="whitespace-nowrap">
            / 1{product.baseUnit}
          </div>
        </div>
        <span>
    - 
        </span>
        <div className="flex items-baseline gap-2">
          <span>$</span>
          <UnderlineCurrencyInput
            className="w-full"
            value={getterList[1]}
            onValueChange={(value) => onValueChange(value, setterList[1])}
            onFocus={() => setCurrentElementIndex(1)} 
            ref={refList[1]} 
            type="text" 
          />
          <div className="whitespace-nowrap">
          / 1{product.baseUnit}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-baseline gap-2 mt-2 text-xl">
        <span>Qty</span>
        {
          !isBaseUnit
          &&
          <UnderlineInput
            className="w-20"
            value={convertBaseUnitQuantityToQuantity(unit.toBaseUnit, Number(getterList[2])) || ''}  
            onInput={handleQtyInput}
            onFocus={() => setCurrentElementIndex(2)} 
            ref={!isBaseUnit && refList[2]} 
            type="number" 
          />
        }
        {
          isBaseUnit
          &&
          <UnderlineInput
            className="w-20"
            value={getterList[2]}  
            onInput={handleBaseUnitQtyInput}
            onFocus={() => setCurrentElementIndex(2)} 
            ref={isBaseUnit && refList[2]} 
            type="number"
          />
        }
        {isBaseUnit && product.baseUnit}
      </div>
    </div>
  );
}