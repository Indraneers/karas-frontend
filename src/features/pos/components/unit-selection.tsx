import { cn } from "@/lib/utils";
import { ItemCardList } from "./item-card-list";
import { useQuery } from "@tanstack/react-query";
import { getUnits } from "@/features/unit/api/unit";
import { UnitSelectionCard } from "./unit-selection-card";

interface UnitSelectionProps {
  className?: string;
}

export function UnitSelection({ className }: UnitSelectionProps) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['units'],
    queryFn: () => getUnits()
  });

  if (isError) {
    return "error";
  }

  if (isLoading) {
    return "loading";
  }

  if (!data) {
    return "empty";
  }

  return (
    <div className={
      cn([
        'h-full w-full',
        className
      ])
    }>
      <ItemCardList className="mt-2">
        {data?.map((u) => (
          <UnitSelectionCard unit={u} key={u.id} />
        ))}
      </ItemCardList>
    </div>
  );
}