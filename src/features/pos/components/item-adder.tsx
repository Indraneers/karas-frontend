import { UnderlineInput } from "@/components/underline-input";
import { NumpadKey } from "./numpad-key";
import { ArrowRight, Check, Delete } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { isMoreThanTwoDigit, isValidCurrencyInput } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { Item } from "@/types/item";
import { usePosStore } from "../store/pos";

interface ItemAdderProps {
  item: Item;
  setOpen: (b: boolean) => void
}

export function ItemAdder({ item, setOpen }: ItemAdderProps) {
  const firstInput = useRef<HTMLInputElement>(null);
  const secondInput = useRef<HTMLInputElement>(null);
  const thirdInput = useRef<HTMLInputElement>(null);

  const [price, setPrice] = useState<string>((item.price/100).toString());
  const [discount, setDiscount] = useState<string>('');
  const [qty, setQty] = useState<string>('');

  const { items, setItems } = usePosStore();

  const getterList = [price, discount, qty];
  const setterList = [setPrice, setDiscount, setQty];
  const refList = [firstInput, secondInput, thirdInput];

  const [currentElementIndex, setCurrentElementIndex] = useState(0);

  const defaultPrice = (item.price/100).toString();

  const totalCost =
  (
    (
      (parseFloat(price) * 100)
      -
      (parseFloat(discount) * 100)
    )
  *
  parseInt(qty)
  ) / 100
  ;

  function isAlreadyDecimal(text: string) {
    return text.split('.').length > 1;
  }

  function handleInput(event: FormEvent<HTMLInputElement>) {
    const getter = getterList[currentElementIndex];
    const setter = setterList[currentElementIndex];
    const value = event.currentTarget.value;

    if (currentElementIndex == 0 || currentElementIndex == 1) {
      if (!isValidCurrencyInput(value)) {
        setter(getter);
        return;
      }

      if (isMoreThanTwoDigit(value)) {
        return;
      }

      setter(value);
    }
    else if (currentElementIndex == 2) {
      if (!Number.isInteger(parseInt(value)) && value != '') {
        return;
      }

      setter(value);
    }
  }

  function handleNumpadKey(key: string | number) {
    const input = refList[currentElementIndex];
    
    if (!input || !input.current) {
      return;
    }

    let newInput = input.current.value;

    if (currentElementIndex == 0 || currentElementIndex == 1) {

      if (key == 'd') {
        newInput = newInput.slice(0, -1);
      }
      else if ((key == '.' && isAlreadyDecimal(newInput))) {
        newInput += key;
      }
      else {
        newInput += key;
      }

      if (isMoreThanTwoDigit(newInput) || !isValidCurrencyInput(newInput)) {
        return;
      }

      input.current.value = newInput;
    }
    else if (currentElementIndex == 2) {
      if (!Number.isInteger(parseInt(newInput)) && newInput != '') {
        return;
      }
      if (key == '.') {
        return;
      }
      newInput += key;
    }

    input.current.value = newInput;
  }

  function handleSubmit() {
    const itemResult: Item = {
      ...item,
      price: Math.floor(parseFloat(price) * 100),
      quantity: parseInt(qty),
      discount: Math.floor(parseFloat(price) * 100)
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
              <UnderlineInput 
                defaultValue={defaultPrice}
                onInput={handleInput}
                onFocus={() => setCurrentElementIndex(0)} 
                ref={firstInput} 
                type="text" 
              />
            </div>
            <span>
            - 
            </span>
            <div className="flex items-baseline gap-2">
              <span>$</span>
              <UnderlineInput 
                onInput={handleInput}
                onFocus={() => setCurrentElementIndex(1)} 
                ref={secondInput} 
                type="text" 
              />
            </div>
            <div className="flex items-baseline gap-2 ml-2">
              <span>Qty</span>
              <UnderlineInput 
                onInput={handleInput}
                onFocus={() => setCurrentElementIndex(2)} 
                ref={thirdInput} 
                type="text"
              />
            </div>
          </div>
          <div className="text-right mt-4 font-semibold text-2xl">
            $ {(totalCost || 0).toFixed(2)}
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 bg-background rounded-[2rem] text-3xl">
          <NumpadKey 
            onClick={() => handleNumpadKey(7)}
            className="rounded-tl-[2rem]"
          >
            7
          </NumpadKey>
          <NumpadKey
            onClick={() => handleNumpadKey(8)}
          >
            8
          </NumpadKey>
          <NumpadKey 
            onClick={() => handleNumpadKey(9)}
            className="rounded-tr-[2rem]"
          >
            9
          </NumpadKey>
          <NumpadKey
            onClick={() => handleNumpadKey(4)}
          >
            4
          </NumpadKey>
          <NumpadKey
            onClick={() => handleNumpadKey(5)}
          >
            5
          </NumpadKey>
          <NumpadKey
            onClick={() => handleNumpadKey(6)}
          >
            6
          </NumpadKey>
          <NumpadKey
            onClick={() => handleNumpadKey(1)}
          >
            1
          </NumpadKey>
          <NumpadKey
            onClick={() => handleNumpadKey(2)}
          >
            2
          </NumpadKey>
          <NumpadKey
            onClick={() => handleNumpadKey(3)}
          >
            3
          </NumpadKey>
          <NumpadKey
            onClick={() => handleNumpadKey('d')}
          >
            <Delete />
          </NumpadKey>
          <NumpadKey
            onClick={() => handleNumpadKey(0)}
          >
            0
          </NumpadKey>
          <NumpadKey
            className={cn([
              currentElementIndex === 2 && 'bg-foreground/20 hover:bg-foreground/20 cursor-auto hover:text-foreground'
            ])}
            onClick={() => handleNumpadKey('.')}
          >
            .
          </NumpadKey>
          {
            currentElementIndex !== 2 &&
            <NumpadKey 
              onClick={() => setCurrentElementIndex(currentElementIndex + 1)}
              className="col-span-3 bg-green-500 hover:bg-green-400 py-4 rounded-b-[2rem] text-background aspect-auto"
            >
              <ArrowRight />
            </NumpadKey>
          }
          {
            currentElementIndex === 2 &&
            <NumpadKey 
              className="col-span-3 bg-green-500 hover:bg-green-400 py-4 rounded-b-[2rem] text-background aspect-auto"
              onClick={() => handleSubmit()}
            >
              <Check />
            </NumpadKey>
          }
        </div>
      </div>
    </div>
  );
}