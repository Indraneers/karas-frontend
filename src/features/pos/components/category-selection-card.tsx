import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CategoryDto } from "@/features/category/dto/category.dto";
import { Droplet } from "lucide-react";

interface CategorySelectionCardProps {
  category: CategoryDto;
}

export function CategorySelectionCard({ category }: CategorySelectionCardProps) {
  return (
    <Card className="flex flex-col hover:bg-accent w-full h-full hover:text-background transition aspect-square group">
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