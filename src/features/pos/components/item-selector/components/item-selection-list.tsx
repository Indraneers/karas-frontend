import { ItemSelectionCard } from "./item-selection-card";

interface ItemSelectionListProps {
  className?: string;
}

export function ItemSelectionList({ className = '' }: ItemSelectionListProps) {
  return (
    <div className={"overflow-y-scroll gap-2 grid grid-cols-3 " + className}>
      {
        Array.from(Array(12).keys()).map((_v, i) => (
          <ItemSelectionCard key={i} name="Engine Oil" />
        ))
      }
    </div>
  );
}