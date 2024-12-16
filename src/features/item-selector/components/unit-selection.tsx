import { cn } from "@/lib/utils";
import { ItemCardList } from "./item-card-list";
import { useQuery } from "@tanstack/react-query";
import { getUnits } from "@/features/unit/api/unit";
import { UnitSelectionCard } from "./unit-selection-card";
import { useItemSelectionStore } from "../store/item-selection";
import { UnitSearch } from "@/features/unit/components/unit-search";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { convertUnitDtoToUnit } from "@/features/unit/util/convert";

interface UnitSelectionProps {
  className?: string;
}

export function UnitSelection({ className }: UnitSelectionProps) {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  const { product } = useItemSelectionStore();
  const { isError, data } = useQuery({
    queryKey: ['units', debouncedQ],
    queryFn: () => getUnits({ productId: product?.id, q: debouncedQ })
  });

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