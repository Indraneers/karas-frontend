import { UnderlineCurrencyInput } from "@/features/pos/components/underline-currency-input";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Item } from "@/types/item";
import { usePosStore } from "../store/pos";
import { UnderlineInput } from "@/features/pos/components/underline-input";
import { Numpad } from "./numpad";
import { calculateTotalCost } from "../utils/pos";
import { v4 as uuidv4 } from 'uuid';

interface ItemAdderProps {
  item: Item;
  setOpen: (b: boolean) => void
}

export function ItemAdder({ item, setOpen }: ItemAdderProps) {
  const firstInput = useRef<HTMLInputElement>(null);
  const secondInput = useRef<HTMLInputElement>(null);
  const thirdInput = useRef<HTMLInputElement>(null);

  const [price, setPrice] = useState<string>(item.price.toString());
  const [discount, setDiscount] = useState<string>('');
  const [qty, setQty] = useState<string>('');

  const { items, setItems } = usePosStore();

  const getterList = [price, discount, qty];
  const setterList = [setPrice, setDiscount, setQty];
  const refList = [firstInput, secondInput, thirdInput];

  const [currentElementIndex, setCurrentElementIndex] = useState(0);

  const totalCost = calculateTotalCost(price, discount, qty);


  function onValueChange(value: string | undefined) {
    const setter = setterList[currentElementIndex];
    setter(value || '');
  }

  function handleQtyInput(event: FormEvent<HTMLInputElement>) {
    setQty(parseInt(event.currentTarget.value).toString());
  }

  function handleSubmit() {
    const itemResult: Item = {
      ...item,
      price,
      quantity: parseInt(qty) || 0,
      discount,
      // temporary solution for id
      id: uuidv4()
    };
    
    setItems([...items, itemResult]);
    setOpen(false);
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
    <div className="bg-background p-2 rounded-[2.5rem] w-[22.5vw]">
      <div className="bg-accent rounded-[2rem] text-background">
        {/* Input screen */}
        <div className="p-4">
          <div className="flex gap-2 text-xl">
            <div className="flex items-baseline gap-2">
              <span>$</span>
              <UnderlineCurrencyInput 
                value={price}
                onValueChange={onValueChange}
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
                value={discount}
                onValueChange={onValueChange}
                onFocus={() => setCurrentElementIndex(1)} 
                ref={secondInput} 
                type="text" 
              />
            </div>
            <div className="flex items-baseline gap-2 ml-2">
              <span>Qty</span>
              <UnderlineInput 
                value={qty}  
                onInput={handleQtyInput}
                onFocus={() => setCurrentElementIndex(2)} 
                ref={thirdInput} 
                type="number" 
              />
            </div>
          </div>
          <div className="text-right mt-4 font-semibold text-2xl">
            $ {totalCost}
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