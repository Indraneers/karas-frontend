import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CategoryDto } from "@/features/category/types/category.dto";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { getImageUrl } from "@/lib/image";
import { cn } from "@/lib/utils";
import { FilterIcon } from "@/components/filter-icon";

interface CategorySelectionCardProps {
  category: CategoryDto;
}

export function CategorySelectionCard({ category }: CategorySelectionCardProps) {
  const { setSelector, setCategory } = useItemSelectionStore();

  function handleClick() {
    setSelector(ItemSelectionEnum.SUBCATEGORY);
    setCategory(category);
  }

  return (
    <Card 
      className={cn([
        "flex flex-col border-primary hover:!bg-accent shadow-none w-full hover:text-background transition cursor-pointer aspect-square group",
        category.color && 'border-none' + 'bg-[#' + category.color + ']'
      ])}
      style={{ background: category.color }}
      onClick={handleClick}
    >
      <CardHeader>
        { category.img && category.img.length > 0 && 
          <FilterIcon
            className={cn([
              'group-hover:bg-accent',
              category.color ? 'bg-background' : 'bg-accent'
            ])}
            src={getImageUrl(category.img)}
          />
        }
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter className="flex flex-col items-start text-md">
        <div className={cn([
          "font-medium text-lg",
          category.color && 'text-background'
        ])}>{category.name}</div>
        <div className={cn([
          "group-hover:text-background text-foreground text-sm",
          category.color && 'text-background/80'
        ])}>{category.subcategoryCount || 0} subcategories</div>
      </CardFooter>
    </Card>
  );
}