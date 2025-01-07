import { cn } from "@/lib/utils";
import { ItemCardList } from "./item-card-list";
import { useItemSelectionStore } from "../store/item-selection";
import { ProductSearch } from "@/features/product/components/product-search";
import { useSubcategorySearch } from "@/features/subcategory/hooks/subcategory-search";
import { SubcategorySelectionCard } from "./subcategory-selection-card";

interface SubcategorySelectionProps {
  className?: string;
}

export function SubcategorySelection({ className }: SubcategorySelectionProps) {
  const { category } = useItemSelectionStore();

  const { q, setQ, isError, data } = useSubcategorySearch({ categoryId: category?.id || '' });
  console.log(data);
  return (
    <div className={
      cn([
        'h-full w-full grid grid-rows-[auto,1fr] gap-2',
        className
      ])
    }>
      <ProductSearch value={q} onChange={setQ} />
      { isError && "error" }
      { !data && "empty" }
      {
        data
        &&
        <ItemCardList className="mt-2">
          {data?.map((p) => (
            <SubcategorySelectionCard subcategory={p} key={p.id} />
          ))}
        </ItemCardList>
      }
    </div>
  );
}