import { UnderlineCurrencyInput } from "@/features/pos/components/underline-currency-input";
import { FormEvent, useEffect, useRef, useState } from "react";
import { usePosStore } from "../store/pos";
import { UnderlineInput } from "@/features/pos/components/underline-input";
import { Numpad } from "./numpad";
import { calculateTotalCost } from "@/features/sale/utils/sale";
import { v4 as uuidv4 } from 'uuid';
import { Currency } from "@/components/currency";
import { convertCurrencyToInputString, convertStringToCurrency } from "@/lib/currency";
import { Item } from "@/features/sale/types/item";
import { cn } from "@/lib/utils";

interface ItemAdderProps {
  item: Item;
  setOpen: (b: boolean) => void
}

export function ItemAdder({ item, setOpen }: ItemAdderProps) {
  const firstInput = useRef<HTMLInputElement>(null);
  const secondInput = useRef<HTMLInputElement>(null);
  const thirdInput = useRef<HTMLInputElement>(null);

  const [price, setPrice] = useState<string>(convertCurrencyToInputString(item.price));
  const [discount, setDiscount] = useState<string>('');
  const [qty, setQty] = useState<string>('');

  const { addItem } = usePosStore();

  const getterList = [price, discount, qty];
  const setterList = [setPrice, setDiscount, setQty];
  const refList = [firstInput, secondInput, thirdInput];

  const [currentElementIndex, setCurrentElementIndex] = useState(0);

  const totalCost = calculateTotalCost(
    convertStringToCurrency(price), 
    convertStringToCurrency(discount), 
    Number(qty)
  );


  function onValueChange(value: string | undefined, setter: (id: string) => void) {
    setter(value || '');
  }

  function handleQtyInput(event: FormEvent<HTMLInputElement>) {
    setQty(Number(event.currentTarget.value).toString());
  }

  function handleSubmit() {
    const itemResult: Item = {
      ...item,
      price: convertStringToCurrency(price),
      quantity: parseInt(qty) || 0,
      discount: convertStringToCurrency(discount),
      // temporary solution for id
      id: uuidv4()
    };
    
    addItem(itemResult);
    setOpen(false);
  }

  function handleOnEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') {
      return;
    }
    if (currentElementIndex < 2) {
      setCurrentElementIndex(currentElementIndex + 1);
    }
    else {
      handleSubmit();
    }
  }

  useEffect(() => {
    if (firstInput && firstInput.current) {
      firstInput.current.focus();
    }
  }, [firstInput]);

  useEffect(() => {
    switch(currentElementIndex) {
    case 0:
      if (firstInput && firstInput.current) {
        firstInput.current.focus();
      }
      break;
    case 1:
      if (secondInput && secondInput.current) {
        secondInput.current.focus();
      }
      break;
    case 2:
      if (thirdInput && thirdInput.current) {
        thirdInput.current.focus();
      }
      break;
    }
  }, [currentElementIndex]);

  return (
    <div 
      onKeyDown={handleOnEnter}
      className="bg-background p-2 rounded-[2.5rem] w-[22.5vw]"
    >
      <div className="bg-accent rounded-[2rem] text-background">
        {/* Input screen */}
        <div className="p-4">
          <div className="flex gap-2 text-">
            <div className="flex items-baseline gap-2">
              <span>$</span>
              <UnderlineCurrencyInput 
                className="w-12"
                value={price}
                onValueChange={(value) => onValueChange(value, setterList[0])}
                onFocus={() => setCurrentElementIndex(0)} 
                ref={firstInput} 
              />
            </div>
            <span>
            - 
            </span>
            <div className="flex items-baseline gap-2">
              <span>$</span>
              <UnderlineCurrencyInput
                className="w-12"
                value={discount}
                onValueChange={(value) => onValueChange(value, setterList[1])}
                onFocus={() => setCurrentElementIndex(1)} 
                ref={secondInput} 
                type="text" 
              />
            </div>
            <div className="flex flex-nowrap items-baseline gap-2">
              <span>Qty</span>
              <UnderlineInput 
                className="w-10"
                value={qty}  
                onInput={handleQtyInput}
                onFocus={() => setCurrentElementIndex(2)} 
                ref={thirdInput} 
                type="number" 
              />
            </div>
            <span className={cn([
              "text-lg hidden",
              item.unit.product?.variable && 'block'
            ])}>{item.unit.product?.baseUnit}</span>
          </div>
          <div className="text-right mt-4 font-semibold text-2xl">
            <Currency amount={totalCost} />
          </div>
        </div>
        <Numpad 
          currentElementIndex={currentElementIndex}
          setCurrentElementIndex={setCurrentElementIndex}
          input={refList[currentElementIndex]}
          getter={getterList[currentElementIndex]}
          setter={setterList[currentElementIndex]}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}