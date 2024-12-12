import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ProductDto } from "@/features/product/dto/product.dto";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { Thumbnail } from "@/components/thumbnail";

interface ProductSelectionCardProps {
  product: ProductDto
}

export function ProductSelectionCard({ product }: ProductSelectionCardProps) {
  const { setProduct, setSelector } = useItemSelectionStore();

  function handleClick() {
    setSelector(ItemSelectionEnum.UNIT);
    setProduct(product);
  }

  return (
    <Card 
      className="flex flex-col hover:bg-accent w-full h-full hover:text-background transition cursor-pointer group"
      onClick={handleClick}
    >
      <CardContent className="flex justify-center items-center pt-2 h-full">
        <Thumbnail src="/sample-product.webp" />
      </CardContent>
      <CardFooter className="flex flex-col items-start text-sm">
        <div className="font-medium">{product.name}</div>
        <div className="group-hover:text-background text-foreground/50">{product.unitCount || 0} units</div>
      </CardFooter>
    </Card>
  );
}