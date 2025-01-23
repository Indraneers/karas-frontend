import { cn } from "@/lib/utils";
import { ItemCardList } from "./item-card-list";
import { CategorySelectionCard } from "./category-selection-card";
import { CategorySearch } from "@/features/category/components/category-search";
import { useCategorySearch } from "@/features/category/hooks/category-search";
import { ItemSkeletonList } from "./item-skeleton-list";
import { ItemEmpty } from "./item-empty";

interface CategorySelectionProps {
  className?: string;
}

export function CategorySelection({ className }: CategorySelectionProps) {
  const { q, setQ, isLoading, isError, data } = useCategorySearch();
  return (
    <div className={
      cn([
        'h-full w-full',
        className
      ])
    }>
      <div className="gap-2 grid grid-rows-[auto,1fr] h-full">
        <CategorySearch value={q} onChange={setQ}  />
        { isError && 'error'}
        { data?.length === 0 && 
          <ItemEmpty />
        }
        { 
          data 
          &&
          <ItemCardList className="mt-2">
            {
              isLoading &&
              <ItemSkeletonList />
            }
            {data?.map((c) => (
              <CategorySelectionCard category={c} key={c.id} />
            ))}
          </ItemCardList>
        }
      </div>
    </div>
  );
}