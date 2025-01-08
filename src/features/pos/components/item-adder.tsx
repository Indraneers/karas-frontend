import { useEffect, useRef, useState } from "react";
import { usePosStore } from "../store/pos";
import { Numpad } from "./numpad";
import { calculateTotalCost } from "@/features/sale/utils/sale";
import { v4 as uuidv4 } from 'uuid';
import { Currency } from "@/components/currency";
import { convertCurrencyToInputString, convertStringToCurrency } from "@/lib/currency";
import { Item } from "@/features/sale/types/item";
import { ItemAdderPanelCountable } from "./item-adder-panel-countable";
import { ItemAdderPanelVariable } from "./item-adder-panel-variable";
import { ToBaseUnitSwitch } from "@/features/unit/components/to-base-unit-switch";
import { cn } from "@/lib/utils";

interface ItemAdderProps {
  item: Item;
  setOpen: (b: boolean) => void
}

export function ItemAdder({ item, setOpen }: ItemAdderProps) {
  const product = item.unit.product;

  const [isBaseUnit, setIsBaseUnit] = useState(true);

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


  function handleSubmit() {
    const itemResult: Item = {
      ...item,
      price: convertStringToCurrency(price),
      quantity: Number(qty) || 0,
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
    <div className={cn([
      "relative",
      product.variable && 'pt-12'
    ])}>
      <div className={cn([
        "top-0 right-0 absolute items-center hidden",
        product.variable && 'flex'
      ])}>
        <ToBaseUnitSwitch 
          className="mr-4"
          onChange={setIsBaseUnit}
          baseUnit={product.baseUnit} 
        />
      </div>
      <div 
        onKeyDown={handleOnEnter}
        className="bg-background p-2 rounded-[2.5rem] w-[22.5vw]"
      >
        <div className="bg-accent rounded-[2rem] text-background">
          {/* Input screen */}
          <div className="p-4">
            {
              !product.variable &&
            <ItemAdderPanelCountable 
              getterList={getterList}
              setterList={setterList}
              refList={refList}
              setCurrentElementIndex={setCurrentElementIndex}
            />
            }
            {
              product.variable &&
            <ItemAdderPanelVariable
              getterList={getterList}
              setterList={setterList}
              isBaseUnit={isBaseUnit}
              refList={refList}
              setCurrentElementIndex={setCurrentElementIndex}
              product={product}
              unit={item.unit}
            />
            }
            <div className="text-right mt-6 font-semibold text-2xl">
              <Currency amount={totalCost} />
            </div>
          </div>
          <Numpad 
            currentElementIndex={currentElementIndex}
            setCurrentElementIndex={setCurrentElementIndex}
            input={refList[currentElementIndex]}
            getter={getterList[currentElementIndex]}
            setter={setterList[currentElementIndex]}
            isVariable={product.variable}
            isBaseUnit={isBaseUnit}
            unit={item.unit}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}