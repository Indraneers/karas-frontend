import { Card, CardContent } from "@/components/ui/card";
import { ProductResponseDto } from "@/features/product/types/product.dto";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { getImageUrl } from "@/lib/image";
import { Badge } from "@/components/ui/badge";

interface ProductSelectionCardProps {
  product: ProductResponseDto
}

export function ProductSelectionCard({ product }: ProductSelectionCardProps) {
  const { setProduct, setSelector } = useItemSelectionStore();

  function handleClick() {
    setSelector(ItemSelectionEnum.UNIT);
    setProduct(product);
  }

  return (
    <Card 
      className="relative place-content-center grid hover:bg-accent w-full h-full hover:text-background transition cursor-pointer overflow-hidden group"
      onClick={handleClick}
    >
      <div className="absolute inset-0">
        {
          product.img &&
          <img className="brightness-75 object-cover" src={getImageUrl(product.img)} loading="lazy" />
        }
      </div>
      <CardContent className="z-10 flex flex-col justify-center bg-foreground/50 text-sm">
        <div className="font-bold text-2xl text-background text-center">{product.name}</div>
        <div className="group-hover:text-background inline-block text-right font-medium text-background/90">
          <Badge className="bg-accent rounded-full">
            {product.unitCount || 0} units
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}