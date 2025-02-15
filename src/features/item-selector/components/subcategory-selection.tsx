import { cn } from "@/lib/utils";
import { ItemCardList } from "./item-card-list";
import { useItemSelectionStore } from "../store/item-selection";
import { useSubcategorySearch } from "@/features/subcategory/hooks/subcategory-search";
import { SubcategorySelectionCard } from "./subcategory-selection-card";
import { ItemSkeletonList } from "./item-skeleton-list";
import { ItemEmpty } from "./item-empty";
import { SubcategorySearch } from "@/features/subcategory/components/subcategory-search";

interface SubcategorySelectionProps {
  className?: string;
}

export function SubcategorySelection({ className }: SubcategorySelectionProps) {
  const { category } = useItemSelectionStore();

  const { q, setQ, isLoading, isError, data } = useSubcategorySearch({ categoryId: category?.id || '' });
  return (
    <div className={
      cn([
        'h-full w-full grid grid-rows-[auto,1fr] gap-2',
        className
      ])
    }>
      <SubcategorySearch value={q} onChange={setQ} />
      { isError && "error" }
      { data?.length === 0 && 
        <ItemEmpty />
      }
      {
        (isLoading || (data && data.length > 0)) &&
        <ItemCardList className="mt-2">
          {
            isLoading && 
            <ItemSkeletonList />
          }
          {data?.map((p) => (
            <SubcategorySelectionCard subcategory={p} key={p.id} />
          ))}
        </ItemCardList>
      }
    </div>
  );
}