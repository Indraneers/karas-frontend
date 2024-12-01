import { cn } from "@/lib/utils";
import { ItemCardList } from "./item-card-list";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/features/product/api/product";
import { ProductSelectionCard } from "./product-selection-card";
import { useItemSelectionStore } from "../store/item-selection";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { ProductSearch } from "@/features/product/components/product-search";

interface ProductSelectionProps {
  className?: string;
}

export function ProductSelection({ className }: ProductSelectionProps) {
  const { category } = useItemSelectionStore();
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);

  console.log('hello');
  
  const { isError,data } = useQuery({
    queryKey: ['products' + category?.name || null, debouncedQ],
    queryFn: () => getProducts({ categoryId: category?.id, q: debouncedQ })
  });

  return (
    <div className={
      cn([
        'h-full w-full',
        className
      ])
    }>
      <ProductSearch value={q} onChange={(value: string) => setQ(value)} />
      { isError && "error" }
      { !data && "empty" }
      {
        data
        &&
        <ItemCardList className="mt-2">
          {data?.map((p) => (
            <ProductSelectionCard product={p} key={p.id} />
          ))}
        </ItemCardList>
      }
    </div>
  );
}