import { cn } from "@/lib/utils";
import { useItemSelectionStore } from "../store/item-selection";
import { useSubcategorySearch } from "@/features/subcategory/hooks/subcategory-search";
import { ItemEmpty, ItemCardList, ItemSkeletonList } from "./item-selector";

interface SubcategorySelectionProps {
  className?: string;
}

export function SubcategorySelection({ className }: SubcategorySelectionProps) {
  const { category } = useItemSelectionStore();
  const { isLoading, isError, data } = useSubcategorySearch({ categoryId: category?.id || "" });

  return (
    <div className={cn("h-full w-full", className)}>
      {isError && "error"}
      {!isLoading && data?.length === 0 && <ItemEmpty />}
      {(isLoading || (data && data.length > 0)) && (
        <ItemCardList>
          {isLoading && <ItemSkeletonList />}
          {data?.map((p) => (
            <SubcategorySelectionCard subcategory={p} key={p.id} />
          ))}
        </ItemCardList>
      )}
    </div>
  );
}

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { SubcategoryResponseDto } from "@/features/subcategory/types/subcategory.dto";
import { FilterIcon } from "@/components/filter-icon";
import { softenColor } from "@/lib/color";

interface SubcategorySelectionCardProps {
  subcategory: SubcategoryResponseDto
}

export function SubcategorySelectionCard({ subcategory }: SubcategorySelectionCardProps) {
  const { setSelector, setSubcategory } = useItemSelectionStore();

  function handleClick() {
    setSelector(ItemSelectionEnum.PRODUCT);
    setSubcategory(subcategory);
  }

  const tint = softenColor(subcategory.color);

  return (
    <Card
      className={cn(
        "flex flex-col border border-border/60 shadow-none w-full transition cursor-pointer aspect-square group",
        "hover:border-foreground/20"
      )}
      style={tint ? { backgroundColor: tint } : undefined}
      onClick={handleClick}
    >
      <CardHeader className="pb-0">
        {subcategory.img && subcategory.img.length > 0 &&
          <div className="w-8 lg:w-8 xl:w-10 h-8 lg:h-8 xl:h-10">
            <FilterIcon
              className="bg-card/80 group-hover:bg-card"
              src={subcategory.img}
            />
          </div>
        }
      </CardHeader>
      <CardContent className="grow p-0" />
      <CardFooter className="flex flex-col items-start">
        <div className="font-medium text-xs lg:text-base xl:text-lg text-foreground">
          {subcategory.name}
        </div>
        <div className="text-muted-foreground text-xs lg:text-sm">
          {subcategory.productCount || 0} products
        </div>
      </CardFooter>
    </Card>
  );
}