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
        'h-full w-full overflow-hidden',
        className
      ])
    }>
      <div className="h-full overflow-hidden">
        <CategorySearch value={q} onChange={(value: string) => setQ(value)}  />
        { isError && 'error'}
        { !data && 'empty' }
        { 
          data 
          &&
          <ItemCardList className="mt-4">
            {data?.map((c) => (
              <CategorySelectionCard category={c} key={c.id} />
            ))}
          </ItemCardList>
        }
      </div>
    </div>
  );
}