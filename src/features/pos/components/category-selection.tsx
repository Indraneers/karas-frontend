import { cn } from "@/lib/utils";
import { ItemCardList } from "./item-card-list";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/features/category/api/category";
import { CategorySelectionCard } from "./category-selection-card";
import { CategorySearch } from "@/features/category/components/category-search";
import { useState } from "react";
import { useDebounce } from '@uidotdev/usehooks';

interface CategorySelectionProps {
  className?: string;
}

export function CategorySelection({ className }: CategorySelectionProps) {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  const { isError, data } = useQuery({
    queryKey: ['categories', debouncedQ],
    queryFn: () => getCategories({ q: debouncedQ })
  });

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
        { !data && 'empty' }
        { 
          data 
          &&
          <ItemCardList>
            {data?.map((c) => (
              <CategorySelectionCard category={c} key={c.id} />
            ))}
          </ItemCardList>
        }
      </div>
    </div>
  );
}