import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import { usePosStore } from "../store/pos";
import { v4 as uuidv4 } from 'uuid';
import { Currency } from "@/components/currency";
import { Item } from "@/features/sale/types/item";
import { UnderlineCurrencyInput } from "./underline-currency-input";
import { UnderlineInput } from "./underline-input";
import { Unit } from "@/features/unit/types/unit";
import { convertDiscreteQuantityToVariableQuantity, convertDisplayQuantityToVariableQuantity, convertVariableQuantityToDiscreteQuantity, convertVariableQuantityToDisplayQuantity } from "@/features/unit/util/convert";
import { ProductRequestDto } from "@/features/product/types/product.dto";
import { cn } from "@/lib/utils";
import { FormEvent } from "react";
import { ArrowRight, Check, Delete } from "lucide-react";
import { convertCurrencyStringToRawCurrency, convertRawCurrencyToCurrencyString } from "@/features/currency/utils/currency";

interface ItemAdderProps {
  item: Item;
  setOpen: (b: boolean) => void
}

interface ItemAdderPanelStateInterface {
  price: string;
  discount: string;
  variableQty: string;
  qtyString: string;
  setPrice: Dispatch<SetStateAction<string>>;
  setDiscount: Dispatch<SetStateAction<string>>;
  setVariableQty: Dispatch<SetStateAction<string>>;
  setQtyString: Dispatch<SetStateAction<string>>;
}

interface ItemAdderPanelRefsInterface {
  priceInput: React.RefObject<HTMLInputElement>;
  discountInput: React.RefObject<HTMLInputElement>;
  qtyInput: React.RefObject<HTMLInputElement>
}


export function ItemAdder({ item, setOpen }: ItemAdderProps) {
  const product = item.unit.product;
  const isVariable = product.variable;

  const [currentElementIndex, setCurrentElementIndex] = useState(0);  
  const [isBaseUnit, setIsBaseUnit] = useState(true);

  const priceInput = useRef<HTMLInputElement>(null);
  const discountInput = useRef<HTMLInputElement>(null);
  const qtyInput = useRef<HTMLInputElement>(null);

  const [price, setPrice] = useState<string>(convertRawCurrencyToCurrencyString(item.price));
  const [discount, setDiscount] = useState<string>('');
  const [variableQty, setVariableQty] = useState<string>('');
  const [qtyString, setQtyString] = useState<string>('');

  const { addItem } = usePosStore();

  const stateProps: ItemAdderPanelStateInterface = {
    price,
    discount,
    variableQty,
    qtyString,
    setPrice,
    setDiscount,
    setVariableQty,
    setQtyString
  };

  const refProps : ItemAdderPanelRefsInterface = {
    priceInput,
    discountInput,
    qtyInput
  };

  const totalCost = calculateTotalCost(
    convertCurrencyStringToRawCurrency(price), 
    convertCurrencyStringToRawCurrency(discount), 
    convertVariableQuantityToDisplayQuantity(Number(variableQty))
  );

  function handleSubmit() {
    const itemResult: Item = {
      ...item,
      price: convertCurrencyStringToRawCurrency(price),
      quantity: Number(variableQty),
      discount: convertCurrencyStringToRawCurrency(discount),
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

  function onSwitchBaseUnit() {
    if (isBaseUnit) {
      const discreteQty = convertVariableQuantityToDiscreteQuantity(variableQty, item.unit.toBaseUnit);
      setQtyString(String(discreteQty));
    }
    else {
      const variableQty = convertVariableQuantityToDisplayQuantity(convertDiscreteQuantityToVariableQuantity(qtyString, item.unit.toBaseUnit));
      setQtyString(String(variableQty));
    }

    setIsBaseUnit(!isBaseUnit);
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
          onChange={onSwitchBaseUnit}
          baseUnit={product.baseUnit} 
        />
      </div>
      <div 
        onKeyDown={handleOnEnter}
        className="bg-background p-2 rounded-[2.5rem] w-[40vw] lg:w-[30vw] xl:w-[22.5vw]"
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
              unit={item.unit}
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

  function handleDiscreteQtyInput(event: FormEvent<HTMLInputElement>) {
    const { value } =  event.currentTarget;

    if (!isValidVariableQty(value)) {
      return;
    }
    
    states.setQtyString(value);
    const variableQtyFromInput = convertDiscreteQuantityToVariableQuantity(Number(value), unit.toBaseUnit);
    states.setVariableQty(variableQtyFromInput.toString());
  }
  
  function handleVariableUnitQtyInput(event: FormEvent<HTMLInputElement>) {
    const { value } =  event.currentTarget;

    if (!isValidVariableQty(value)) {
      return;
    }

    states.setQtyString(value);
    const variableQtyFromInput = convertDisplayQuantityToVariableQuantity(value);
    states.setVariableQty(variableQtyFromInput.toString());
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
            value={states.qtyString}
            className="w-20"
            onInput={handleDiscreteQtyInput}
            onFocus={() => setCurrentElementIndex(2)} 
            ref={!isBaseUnit && refs.qtyInput} 
            type="text" 
          />
        }
        {
          isBaseUnit
          &&
          <UnderlineInput
            value={states.qtyString}
            className="w-20"
            onInput={handleVariableUnitQtyInput}
            onFocus={() => setCurrentElementIndex(2)} 
            ref={isBaseUnit && refs.qtyInput} 
            type="text"
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
  unit: Unit;
}

export function ItemAdderPanelCountable({
  states,
  refs,
  setCurrentElementIndex,
  unit
}: ItemAdderPanelCountableProps) {
  /**
   * only for price and discount
   */
  function onValueChange(value: string | undefined, setter: (id: string) => void) {
    setter(value || '');
  }
  
  function handleQtyInput(event: FormEvent<HTMLInputElement>) {
    const { value } =  event.currentTarget;

    if (!isValidVariableQty(value)) {
      return;
    }

    states.setQtyString(value);
    states.setVariableQty(convertDiscreteQuantityToVariableQuantity(value, unit.toBaseUnit).toString());
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
          value={convertVariableQuantityToDiscreteQuantity(states.variableQty, unit.toBaseUnit)}
          className="w-full"
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
      return states.setVariableQty;
    }
  }

  function getGetter(currentElementIndex: number) {
    switch (currentElementIndex) {
    case 0:
      return states.price;
    case 1:
      return states.discount;
    case 2:
      return states.variableQty;
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
      const isDiscreteQuantity = !isBaseUnit || !isVariable;
      let qtyString = '';
      let variableQty = 0;

      if (key === 'd') {
        qtyString = newInput.slice(0, -1);
        if (isDiscreteQuantity)  {
          variableQty = convertDiscreteQuantityToVariableQuantity(qtyString, unit.toBaseUnit);
        }
        else {
          variableQty = convertDisplayQuantityToVariableQuantity(qtyString);
        }
      }
      else if (key === '.') {
        if (isDiscreteQuantity)  {
          variableQty = convertDiscreteQuantityToVariableQuantity(qtyString, unit.toBaseUnit);
        }
        else {
          variableQty = convertDisplayQuantityToVariableQuantity(qtyString);
        }
        qtyString += key;
      }
      else {
        qtyString = newInput += key;
        if (isDiscreteQuantity)  {
          variableQty = convertDiscreteQuantityToVariableQuantity(qtyString, unit.toBaseUnit);
        }
        else {
          variableQty = convertDisplayQuantityToVariableQuantity(qtyString);
        }
      }

      if (!isValidVariableQty(qtyString)) {
        return;
      }

      setter(String(variableQty));
      states.setQtyString(qtyString);
      return;
    }

    if (!isValidCurrencyValue(newInput)) {
      setter(getter);
    }
    else {
      setter(newInput);
    }
  }

  console.log(states);
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

import { Switch } from "@/components/ui/switch";
import { calculateTotalCost } from "@/features/sale/utils/sale";
import { isValidVariableQty } from "@/lib/variable";

interface ToBaseUnitSwitchProps {
  isBaseUnit: boolean;
  className?: string;
  onChange?: (state: boolean) => void;
  baseUnit: string;
}

export function ToBaseUnitSwitch({ isBaseUnit, baseUnit, onChange, className }: ToBaseUnitSwitchProps) {
  return (
    <div className={cn([
      "flex items-center gap-2 bg-background p-2 rounded-md",
      className
    ])}>
      <Switch checked={isBaseUnit} onCheckedChange={onChange} />
    To {baseUnit}
    </div>
  );
}