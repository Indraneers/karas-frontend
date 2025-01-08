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
      className="relative border-primary grid hover:bg-accent py-2 w-full hover:text-background transition cursor-pointer overflow-hidden aspect-square group"
      onClick={handleClick}
    >
      <div className="absolute inset-0">
        {
          product.img && product.img.length > 0 &&
          <img className="brightness-50 object-cover" src={getImageUrl(product.img)} loading="lazy" />
        }
      </div>
      <CardContent className={cn([
        "z-10 text-sm w-full",
        product.img
      ])}>
        <div className={cn([
          "font-bold text-2xl",
          product.img && 'text-background'
        ])}>{product.name}</div>
        <div className={cn([
          "group-hover:text-background flex flex-col items-start gap-1 font-medium text-background mt-2"
        ])}>
          <Badge className={cn([
            'hidden rounded-full bg-amber-500 hover:bg-amber-600 text-xs',
            product.identifier && 'inline-block'
          ])}>
            {product.identifier}
          </Badge>
          <Badge className={cn([
            "bg-accent rounded-full",
            !product.img && "group-hover:bg-background group-hover:text-accent",
            product.identifier && 'mt-1'
          ])}>
            {product.unitCount || 0} units
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}