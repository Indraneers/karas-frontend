import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Droplet } from "lucide-react";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { SubcategoryResponseDto } from "@/features/subcategory/types/subcategory.dto";

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
      className="flex flex-col hover:bg-accent w-full h-full hover:text-background transition cursor-pointer aspect-square group"
      onClick={handleClick}
    >
      <CardHeader>
        <Droplet className="group-hover:text-background text-accent" size={36} />
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter className="flex flex-col items-start">
        <div className="font-medium text-md">{subcategory.name}</div>
        <div className="group-hover:text-background text-foreground/50 text-sm">{subcategory.productCount || 0} products</div>
      </CardFooter>
    </Card>
  );
}