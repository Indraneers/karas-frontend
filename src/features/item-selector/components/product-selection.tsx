import { cn } from "@/lib/utils";
import { ItemCardList } from "./item-card-list";
import { ProductSelectionCard } from "./product-selection-card";
import { useItemSelectionStore } from "../store/item-selection";
import { ProductSearch } from "@/features/product/components/product-search";
import { useProductSearch } from "@/features/product/hooks/product-search";
import { ItemSkeletonList } from "./item-skeleton-list";
import { ItemEmpty } from "./item-empty";

interface ProductSelectionProps {
  className?: string;
}

export function ProductSelection({ className }: ProductSelectionProps) {
  const { subcategory } = useItemSelectionStore();

  const { q, setQ, isLoading, isError, data } = useProductSearch({ subcategoryId: subcategory?.id });

  return (
    <div className={
      cn([
        'h-full w-full grid grid-rows-[auto,1fr] gap-2',
        className
      ])
    }>
      <ProductSearch value={q} onChange={setQ} />
      { isError && "error" }
      { data?.length === 0 && 
        <ItemEmpty />
      }
      {
        isLoading || (data && data.length > 0) &&
        <ItemCardList className="mt-2">
          {
            isLoading && 
            <ItemSkeletonList />
          }
          {
            data?.map((p) => (
              <ProductSelectionCard product={p} key={p.id} />
            ))
          }
        </ItemCardList>
      }
    </div>
  );
}