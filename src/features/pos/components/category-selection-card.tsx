import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CategoryDto } from "@/features/category/dto/category.dto";
import { Droplet } from "lucide-react";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";

interface CategorySelectionCardProps {
  category: CategoryDto;
}

export function CategorySelectionCard({ category }: CategorySelectionCardProps) {
  const { setSelector, setCategory } = useItemSelectionStore();

  function handleClick() {
    setSelector(ItemSelectionEnum.PRODUCT);
    setCategory(category);
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
      <CardFooter className="flex flex-col items-start text-sm">
        <div className="font-medium">{category.name}</div>
        <div className="group-hover:text-background text-foreground/50">{category.productCount || 0} products</div>
      </CardFooter>
    </Card>
  );
}