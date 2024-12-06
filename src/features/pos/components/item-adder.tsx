import { UnderlineInput } from "@/components/underline-input";
import { NumpadKey } from "./numpad-key";
import { ArrowRight, Delete } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ItemAdder() {
  const firstInput = useRef<HTMLInputElement>(null);
  const secondInput = useRef<HTMLInputElement>(null);
  const thirdInput = useRef<HTMLInputElement>(null);

  const [price, setPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [qty, setQty] = useState<number | null>(null);
  const [lessThan0, setLessThan0] = useState(false);

  const getterList = [price, discount, qty];
  const setterList = [setPrice, setDiscount, setQty];

  const [currentElementIndex, setCurrentElementIndex] = useState(0);

  function handleNumpadKey(key: string | number) {
    const getter = getterList[currentElementIndex];
    const setter = setterList[currentElementIndex];
    if (currentElementIndex == 0 || currentElementIndex == 1 || currentElementIndex == 2) {
      let inputString = getter ? String(getter) : '';

      if (key == 'd') {
        if (inputString.slice(-1) == '.') {
          setLessThan0(false);
        } 
        inputString = inputString.slice(0, -1);
      }
      else if (key == '.') {
        setLessThan0(true);
        return;
      }
      else {
        if (lessThan0) {
          const isDecimal = inputString.split('').includes('.');
          if (!isDecimal) {
            inputString += '.';
          }
        }

        inputString += key;
      }

      if (inputString == '' || inputString == '0.') {
        setter(null);
        setLessThan0(false);
      }
      else {
        const stringToFloatValue = Math.floor(parseFloat(inputString) * 100) / 100 || getter;

        setter(stringToFloatValue);
      }
    }
  }

  useEffect(() => {
    if (firstInput && firstInput.current) {
      firstInput.current.focus();
    }
  }, [firstInput]);

  return (
    <div className="bg-background p-2 rounded-[2.5rem] w-[22.5vw]">
      <div className="bg-accent rounded-[2rem] text-background">
        {/* Input screen */}
        <div className="p-4">
          <div className="flex gap-2 text-xl">
            <div className="flex items-baseline gap-2">
              <span>$</span>
              <UnderlineInput 
                value={price ? price?.toFixed(2) : ''}
                onFocus={() => setCurrentElementIndex(0)} 
                ref={firstInput} 
                type="number" />
            </div>
            <span>
            - 
            </span>
            <div className="flex items-baseline gap-2">
              <span>$</span>
              <UnderlineInput 
                value={discount ? discount?.toFixed(2) : ''}
                onFocus={() => setCurrentElementIndex(1)} 
                ref={secondInput} 
                type="number" />
            </div>
            <div className="flex items-baseline gap-2 ml-2">
              <span>Qty</span>
              <UnderlineInput 
                value={qty || ''}
                onFocus={() => setCurrentElementIndex(2)} 
                ref={thirdInput} 
                type="number" 
              />
            </div>
          </div>
          <div className="text-right mt-4 font-semibold text-2xl">
            $ 1454.72
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
            onClick={() => handleNumpadKey('.')}
          >
            .
          </NumpadKey>
          <NumpadKey className="col-span-3 py-4 rounded-b-[2rem] aspect-auto">
            <ArrowRight />
          </NumpadKey>
        </div>
      </div>
    </div>
  );
}