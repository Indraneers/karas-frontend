import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { SubcategoryResponseDto } from "@/features/subcategory/types/subcategory.dto";
import { getImageUrl } from "@/lib/image";

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
      className="flex flex-col border-primary hover:bg-accent shadow-none w-full h-full hover:text-background transition cursor-pointer aspect-square group"
      onClick={handleClick}
    >
      <CardHeader>
        {subcategory.img && subcategory.img.length > 0 && 
                  <img className="w-8 h-8" src={getImageUrl(subcategory.img)} loading="lazy" />
        }
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter className="flex flex-col items-start">
        <div className="font-medium text-lg text-md">{subcategory.name}</div>
        <div className="group-hover:text-background text-foreground/50 text-sm">{subcategory.productCount || 0} products</div>
      </CardFooter>
    </Card>
  );
}