import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import { usePosStore } from "../store/pos";
import { calculateTotalCost } from "@/features/sale/utils/sale";
import { v4 as uuidv4 } from 'uuid';
import { Currency } from "@/components/currency";
import { convertCurrencyToInputString, convertStringToCurrency } from "@/lib/currency";
import { Item } from "@/features/sale/types/item";
import { UnderlineCurrencyInput } from "./underline-currency-input";
import { UnderlineInput } from "./underline-input";
import { Unit } from "@/features/unit/types/unit";
import { convertBaseQuantityToQuantity, convertQuantityToBaseQuantity } from "@/features/unit/util/convert";
import { ProductRequestDto } from "@/features/product/types/product.dto";
import { ToBaseUnitSwitch } from "@/features/unit/components/to-base-unit-switch";
import { cn } from "@/lib/utils";
import { FormEvent } from "react";
import { ArrowRight, Check, Delete } from "lucide-react";

interface ItemAdderProps {
  item: Item;
  setOpen: (b: boolean) => void
}

interface ItemAdderPanelStateInterface {
  price: string;
  discount: string;
  qty: string;
  setPrice: Dispatch<SetStateAction<string>>;
  setDiscount: Dispatch<SetStateAction<string>>;
  setQty: Dispatch<SetStateAction<string>>;
}

interface ItemAdderPanelRefsInterface {
  priceInput: React.RefObject<HTMLInputElement>;
  discountInput: React.RefObject<HTMLInputElement>;
  qtyInput: React.RefObject<HTMLInputElement>
}


export function ItemAdder({ item, setOpen }: ItemAdderProps) {
  const product = item.unit.product;
  const isVariable = product.variable;

  const [isBaseUnit, setIsBaseUnit] = useState(true);

  const priceInput = useRef<HTMLInputElement>(null);
  const discountInput = useRef<HTMLInputElement>(null);
  const qtyInput = useRef<HTMLInputElement>(null);

  const [price, setPrice] = useState<string>(convertCurrencyToInputString(item.price));
  const [discount, setDiscount] = useState<string>('');
  const [qty, setQty] = useState<string>('');

  const { addItem } = usePosStore();

  const stateProps: ItemAdderPanelStateInterface = {
    price,
    discount,
    qty,
    setPrice,
    setDiscount,
    setQty
  };

  const refProps : ItemAdderPanelRefsInterface = {
    priceInput,
    discountInput,
    qtyInput
  };

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
  

  /**
   * auto set price input as the default panel
   */
  useEffect(() => {
    if (priceInput && priceInput.current) {
      priceInput.current.focus();
    }
  }, [priceInput]);

  /**
   * Handles keyboard input and switches between panels
   */
  useEffect(() => {
    switch(currentElementIndex) {
    case 0:
      if (priceInput && priceInput.current) {
        priceInput.current.focus();
      }
      break;
    case 1:
      if (discountInput && discountInput.current) {
        discountInput.current.focus();
      }
      break;
    case 2:
      if (qtyInput && qtyInput.current) {
        qtyInput.current.focus();
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
          isBaseUnit={isBaseUnit}
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
              !isVariable &&
            <ItemAdderPanelCountable 
              states={stateProps}
              refs={refProps}
              setCurrentElementIndex={setCurrentElementIndex}
            />
            }
            {
              isVariable &&
            <ItemAdderPanelVariable
              states={stateProps}
              refs={refProps}
              setCurrentElementIndex={setCurrentElementIndex}
              product={product}
              unit={item.unit}
              isBaseUnit={isBaseUnit}
            />
            }
            <div className="mt-6 font-semibold text-2xl text-right">
              <Currency amount={totalCost} />
            </div>
          </div>
          <Numpad 
            currentElementIndex={currentElementIndex}
            setCurrentElementIndex={setCurrentElementIndex}
            states={stateProps}
            refs={refProps}    
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

interface ItemAdderPanelVariableProps {
  states: ItemAdderPanelStateInterface;
  refs: ItemAdderPanelRefsInterface
  setCurrentElementIndex:  React.Dispatch<React.SetStateAction<number>>;
  isBaseUnit: boolean;
  product: ProductRequestDto;
  unit: Unit;
}

export function ItemAdderPanelVariable({
  states,
  refs,
  isBaseUnit,
  setCurrentElementIndex,
  product,
  unit
}: ItemAdderPanelVariableProps) {

  /**
   * only for price and discount
   */
  function onValueChange(value: string | undefined, setter: (id: string) => void) {
    setter(value || '');
  }

  function handleQtyInput(event: FormEvent<HTMLInputElement>) {
    const qty = convertQuantityToBaseQuantity(unit.toBaseUnit, Number(event.currentTarget.value));
    states.setQty(qty.toString());
  }
  
  function handleBaseUnitQtyInput(event: FormEvent<HTMLInputElement>) {
    states.setQty(Number(event.currentTarget.value).toString());
  }


  return (
    <div>
      <div className="flex gap-2 text-xl">
        <div className="flex items-baseline gap-2">
          <span>$</span>
          <UnderlineCurrencyInput 
            className="w-full"
            value={states.price}
            onValueChange={(value) => onValueChange(value, states.setPrice)}
            onFocus={() => setCurrentElementIndex(0)} 
            ref={refs.priceInput} 
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
            value={states.discount}
            onValueChange={(value) => onValueChange(value, states.setDiscount)}
            onFocus={() => setCurrentElementIndex(1)} 
            ref={refs.discountInput} 
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
            value={convertBaseQuantityToQuantity(unit.toBaseUnit, Number(states.qty)) || ''}  
            onInput={handleQtyInput}
            onFocus={() => setCurrentElementIndex(2)} 
            ref={!isBaseUnit && refs.qtyInput} 
            type="number" 
          />
        }
        {
          isBaseUnit
          &&
          <UnderlineInput
            className="w-20"
            value={states.qty}  
            onInput={handleBaseUnitQtyInput}
            onFocus={() => setCurrentElementIndex(2)} 
            ref={isBaseUnit && refs.qtyInput} 
            type="number"
          />
        }
        {isBaseUnit && product.baseUnit}
      </div>
    </div>
  );
}

interface ItemAdderPanelCountableProps {
  states: ItemAdderPanelStateInterface;
  refs: ItemAdderPanelRefsInterface;
  setCurrentElementIndex:  React.Dispatch<React.SetStateAction<number>>;
}

export function ItemAdderPanelCountable({
  states,
  refs,
  setCurrentElementIndex
}: ItemAdderPanelCountableProps) {
  /**
   * only for price and discount
   */
  function onValueChange(value: string | undefined, setter: (id: string) => void) {
    setter(value || '');
  }
  
  function handleQtyInput(event: FormEvent<HTMLInputElement>) {
    states.setQty(Number(event.currentTarget.value).toString());
  }
  return (
    <div className="flex gap-2 text-xl">
      <div className="flex items-baseline gap-2">
        <span>$</span>
        <UnderlineCurrencyInput 
          className="w-full"
          value={states.price}
          onValueChange={(value) => onValueChange(value, states.setPrice)}
          onFocus={() => setCurrentElementIndex(0)} 
          ref={refs.priceInput} 
        />
      </div>
      <span>
    - 
      </span>
      <div className="flex items-baseline gap-2">
        <span>$</span>
        <UnderlineCurrencyInput
          className="w-full"
          value={states.discount}
          onValueChange={(value) => onValueChange(value, states.setDiscount)}
          onFocus={() => setCurrentElementIndex(1)} 
          ref={refs.discountInput} 
          type="text" 
        />
      </div>
      <div className="flex items-baseline gap-2">
        <span>Qty</span>
        <UnderlineInput
          className="w-full"
          value={states.qty}  
          onInput={handleQtyInput}
          onFocus={() => setCurrentElementIndex(2)} 
          ref={refs.qtyInput} 
        />
      </div>
    </div>
  );
}

interface NumpadProps {
  states: ItemAdderPanelStateInterface;
  refs: ItemAdderPanelRefsInterface;
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
  isBaseUnit,
  isVariable,
  unit,
  states,
  refs
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

  function getSetter(currentElementIndex: number) {
    switch (currentElementIndex) {
    case 0:
      return states.setPrice;
    case 1:
      return states.setDiscount;
    case 2:
      return states.setQty;
    }
  }

  function getGetter(currentElementIndex: number) {
    switch (currentElementIndex) {
    case 0:
      return states.price;
    case 1:
      return states.discount;
    case 2:
      return states.qty;
    }
  }

  function getInput(currentElementIndex: number) {
    switch (currentElementIndex) {
    case 0:
      return refs.priceInput;
    case 1:
      return refs.discountInput;
    case 2:
      return refs.qtyInput;
    }
  }

  function handleNumpadKey(key: string | number) {  
    const getter = getGetter(currentElementIndex)!;
    const setter = getSetter(currentElementIndex)!;
    const input = getInput(currentElementIndex)!;

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
          newInput = String(convertQuantityToBaseQuantity(unit.toBaseUnit, Number(newQty)));
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
          newInput = String(convertQuantityToBaseQuantity(unit.toBaseUnit, Number(newQty)));
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
        className="col-span-3 bg-amber-500 hover:bg-amber-400 py-4 rounded-b-[2rem] aspect-auto text-background"
      >
        <ArrowRight />
      </NumpadKey>
      }
      {
        currentElementIndex === 2 &&
      <NumpadKey 
        className="col-span-3 bg-green-500 hover:bg-green-400 py-4 rounded-b-[2rem] aspect-auto text-background"
        onClick={() => handleSubmit()}
      >
        <Check />
      </NumpadKey>
      }
    </div>
  );
}

interface NumpadKeyProps {
  className?: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>
}

export function NumpadKey({ children, className, onClick }: NumpadKeyProps) {
  return (
    <div 
      onClick={onClick}
      className={cn([
        "place-content-center grid text-foreground aspect-square hover:bg-accent/80 hover:text-background cursor-pointer",
        className
      ])}>
      {children}
    </div>
  );
}