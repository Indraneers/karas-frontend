import { cn } from "@/lib/utils";
import { ItemCardList } from "./item-card-list";
import { UnitSelectionCard } from "./unit-selection-card";
import { useItemSelectionStore } from "../store/item-selection";
import { UnitSearch } from "@/features/unit/components/unit-search";
import { convertUnitDtoToUnit } from "@/features/unit/util/convert";
import { useUnitSearch } from "@/features/unit/hooks/unit-search";

interface UnitSelectionProps {
  className?: string;
}

export function UnitSelection({ className }: UnitSelectionProps) {
  const { product } = useItemSelectionStore();

  const { q, setQ, data, isError } = useUnitSearch({ productId: product?.id });

  return (
    <div className={
      cn([
        'h-full w-full grid grid-rows-[auto,1fr] gap-2',
        className
      ])
    }>
      <UnitSearch value={q} onChange={setQ} />
      { isError && 'error' }
      { !data && 'empty'}
      {
        data
        &&
        <ItemCardList className="mt-2">
          {data?.map((u) => (
            <UnitSelectionCard unit={convertUnitDtoToUnit(u)} key={u.id} />
          ))}
        </ItemCardList>
      }
    </div>
  );
}