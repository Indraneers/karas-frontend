import { FormEvent } from "react";
import { UnderlineCurrencyInput } from "./underline-currency-input";
import { UnderlineInput } from "./underline-input";

interface ItemAdderPanelCountableProps {
  getterList: string[];
  setterList: React.Dispatch<React.SetStateAction<string>>[];
  refList: React.RefObject<HTMLInputElement>[];
  setCurrentElementIndex:  React.Dispatch<React.SetStateAction<number>>;
}

export function ItemAdderPanelCountable({
  getterList,
  setterList,
  refList,
  setCurrentElementIndex
}: ItemAdderPanelCountableProps) {
  function onValueChange(value: string | undefined, setter: (id: string) => void) {
    setter(value || '');
  }
  
  function handleQtyInput(event: FormEvent<HTMLInputElement>) {
    setterList[2](Number(event.currentTarget.value).toString());
  }
  return (
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
      </div>
      <div className="flex items-baseline gap-2">
        <span>Qty</span>
        <UnderlineInput
          className="w-full"
          value={getterList[2]}  
          onInput={handleQtyInput}
          onFocus={() => setCurrentElementIndex(2)} 
          ref={refList[2]} 
        />
      </div>
    </div>
  );
}