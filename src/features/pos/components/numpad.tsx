import { ArrowRight, Check, Delete } from "lucide-react";
import { NumpadKey } from "./numpad-key";
import { Unit } from "@/features/unit/types/unit";
import { convertQuantityToBaseUnitQuantity } from "@/features/unit/util/convert";
import { cn } from "@/lib/utils";

interface NumpadProps {
  input: React.RefObject<HTMLInputElement>;
  getter: string;
  setter: (v: string) => void;
  handleSubmit: () => void;
  currentElementIndex: number;
  setCurrentElementIndex: (i: number) => void;
  isBaseUnit: boolean;
  isVariable: boolean;
  unit: Unit;
}

export function Numpad({ 
  handleSubmit, 
  currentElementIndex, 
  setCurrentElementIndex,
  input,
  isBaseUnit,
  isVariable,
  unit,
  setter,
  getter
}: NumpadProps) {

  function isMoreThanTwoDigit(t: string) {
    const textArray = t.split('.');
    if (textArray[1] != null) {
      return textArray[1].length > 2;
    }
    return false;
  }
  
  function isValidCurrencyInput(t: string) {
    const validPattern = /^(\d+(\.\d{1,2})?|\d+\.|)$/;
    return validPattern.test(t);
  }
  
  function isValidCurrencyValue(t: string) {
    return isValidCurrencyInput(t) && !isMoreThanTwoDigit(t);
  }

  function handleNumpadKey(key: string | number) {  
    if (!input || !input.current) {
      return;
    }

    let newInput = input.current.value;

    if (currentElementIndex == 0 || currentElementIndex == 1) {

      if (key === 'd') {
        newInput = newInput.slice(0, -1);
      }
      else {
        newInput += key;
      }
    }
    else if (currentElementIndex == 2) {
      const isDirectChange = isBaseUnit || !isVariable;

      if (key === 'd') {
        if (isDirectChange)  {
          newInput = newInput.slice(0, -1);
        }
        else {
          const newQty = String(newInput).slice(0, -1);
          newInput = String(convertQuantityToBaseUnitQuantity(unit.toBaseUnit, Number(newQty)));
        }
      }
      else if (key === '.') {
        if (isDirectChange) {
          newInput += key;
        }
      }
      else {
        if (isDirectChange) {
          newInput += key;
        }
        else {
          const newQty = newInput + key;
          newInput = String(convertQuantityToBaseUnitQuantity(unit.toBaseUnit, Number(newQty)));
        }
      }

      setter(newInput);
      return;
    }

    if (!isValidCurrencyValue(newInput)) {
      setter(getter);
    }
    else {
      setter(newInput);
    }
  }
  return (
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
          currentElementIndex === 2 && isVariable && !isBaseUnit && 'bg-foreground/20 hover:bg-foreground/20 cursor-auto hover:text-foreground'
        ])}
        onClick={() => handleNumpadKey('.')}
      >
      .
      </NumpadKey>
      {
        !(currentElementIndex === 2) &&
      <NumpadKey 
        onClick={() => setCurrentElementIndex(currentElementIndex + 1)}
        className="col-span-3 bg-amber-500 hover:bg-amber-400 py-4 rounded-b-[2rem] text-background aspect-auto"
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
  );
}