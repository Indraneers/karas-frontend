import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CategoryDto } from "@/features/category/types/category.dto";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { getImageUrl } from "@/lib/image";

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
      className="flex flex-col border-primary hover:bg-accent shadow-none w-full h-full hover:text-background transition cursor-pointer aspect-square group"
      onClick={handleClick}
    >
      <CardHeader>
        { category.img && 
          <img className="w-8 h-8" src={getImageUrl(category.img)} loading="lazy" />
        }
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter className="flex flex-col items-start text-md">
        <div className="font-medium text-lg">{category.name}</div>
        <div className="group-hover:text-background text-foreground/50 text-sm">{category.subcategoryCount || 0} subcategories</div>
      </CardFooter>
    </Card>
  );
}