import { cn } from "@/lib/utils";
import { useCategorySearch } from "@/features/category/hooks/category-search";
import { ItemEmpty, ItemCardList, ItemSkeletonList } from "./item-selector";

interface CategorySelectionProps {
  className?: string;
}

export function CategorySelection({ className }: CategorySelectionProps) {
  const { isLoading, isError, data } = useCategorySearch();
  return (
    <div className={cn("h-full w-full", className)}>
      {isError && "error"}
      {!isLoading && data?.length === 0 && <ItemEmpty />}
      {(isLoading || (data && data.length > 0)) && (
        <ItemCardList className="min-h-0">
          {isLoading && <ItemSkeletonList />}
          {data?.map((c) => (
            <CategorySelectionCard category={c} key={c.id} />
          ))}
        </ItemCardList>
      )}
    </div>
  );
}

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CategoryDto } from "@/features/category/types/category.dto";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { FilterIcon } from "@/components/filter-icon";
import { softenColor } from "@/lib/color";
import { ItemContextMenu } from "./item-context-menu";

interface CategorySelectionCardProps {
  category: CategoryDto;
}

export function CategorySelectionCard({
  category,
}: CategorySelectionCardProps) {
  const { setSelector, setCategory } = useItemSelectionStore();

  function handleClick() {
    setSelector(ItemSelectionEnum.SUBCATEGORY);
    setCategory(category);
  }

  const tint = softenColor(category.color);

  return (
    <ItemContextMenu label="category" name={category.name}>
    <Card
      className={cn(
        "flex flex-col border border-border shadow-sm w-full transition cursor-pointer aspect-square group",
        "hover:border-foreground/20 hover:shadow-md hover:-translate-y-0.5"
      )}
      style={tint ? { background: tint } : undefined}
      onClick={handleClick}
    >
      <CardHeader className="pb-0">
        {category.img && category.img.length > 0 && (
          <FilterIcon
            className="bg-card/80 group-hover:bg-card"
            src={category.img}
          />
        )}
      </CardHeader>
      <CardContent className="p-0 grow" />
      <CardFooter className="flex flex-col items-start text-md">
        <div className="font-medium text-xs lg:text-base xl:text-lg text-foreground">
          {category.name}
        </div>
        <div className="text-muted-foreground text-xs lg:text-sm">
          {category.subcategoryCount || 0} subcategories
        </div>
      </CardFooter>
    </Card>
    </ItemContextMenu>
  );
}
