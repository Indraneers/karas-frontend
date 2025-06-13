import { cn } from "@/lib/utils";
import { useItemSelectionStore } from "../store/item-selection";
import { useSubcategorySearch } from "@/features/subcategory/hooks/subcategory-search";
import { SubcategorySearch } from "@/features/subcategory/components/subcategory-search";
import { ItemEmpty, ItemCardList, ItemSkeletonList } from "./item-selector";

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
      { !isLoading && data?.length === 0 && 
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

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { SubcategoryResponseDto } from "@/features/subcategory/types/subcategory.dto";
import { getImageUrl } from "@/lib/image";
import { FilterIcon } from "@/components/filter-icon";

interface SubcategorySelectionCardProps {
  subcategory: SubcategoryResponseDto
}

export function SubcategorySelectionCard({ subcategory }: SubcategorySelectionCardProps) {
  const { setSelector, setSubcategory } = useItemSelectionStore();

  function handleClick() {
    setSelector(ItemSelectionEnum.PRODUCT);
    setSubcategory(subcategory);
  }

  return (
    <Card 
      className={cn([
        "flex flex-col border-primary hover:bg-accent shadow-none w-full hover:text-background transition cursor-pointer aspect-square group",
        subcategory.color && 'border-none'
      ])}
      style={{ backgroundColor: subcategory.color }}
      onClick={handleClick}
    >
      <CardHeader>
        {subcategory.img && subcategory.img.length > 0 && 
          <FilterIcon
            className={cn([
              'group-hover:bg-accent',
              subcategory.color ? 'bg-background' : 'bg-accent'
            ])}
            src={getImageUrl(subcategory.img)}
          />
        }
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter className="flex flex-col items-start">
        <div className={cn([
          "font-medium text-lg",
          subcategory.color && 'text-background'
        ])}>{subcategory.name}</div>
        <div className={cn([
          "group-hover:text-background text-sm text-foreground/50",
          subcategory.color && 'text-background/80'
        ])}>{subcategory.productCount || 0} products</div>
      </CardFooter>
    </Card>
  );
}