import { Card, CardContent } from "@/components/ui/card";
import { ProductResponseDto } from "@/features/product/types/product.dto";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { getImageUrl } from "@/lib/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
      className="relative place-content-center border-primary grid hover:bg-accent w-full hover:text-background transition cursor-pointer overflow-hidden aspect-square group"
      onClick={handleClick}
    >
      <div className="absolute inset-0">
        {
          product.img && product.img.length > 0 &&
          <img className="brightness-75 object-cover" src={getImageUrl(product.img)} loading="lazy" />
        }
      </div>
      <CardContent className={cn([
        "z-10 flex flex-col justify-center text-sm",
        product.img && 'bg-foreground/50'
      ])}>
        <div className={cn([
          "font-bold text-2xl text-center",
          product.img && 'text-background'
        ])}>{product.name}</div>
        <div className="group-hover:text-background inline-block text-right font-medium text-background/90">
          <Badge className={cn([
            "bg-accent rounded-full",
            !product.img && "group-hover:bg-background group-hover:text-accent"
          ])}>
            {product.unitCount || 0} units
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}