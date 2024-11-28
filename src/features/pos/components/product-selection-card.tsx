import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ProductDto } from "@/features/product/dto/product.dto";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

interface ProductSelectionCardProps {
  product: ProductDto
}

export function ProductSelectionCard({ product }: ProductSelectionCardProps) {
  return (
    <Card className="flex flex-col hover:bg-accent w-full h-full hover:text-background transition aspect-square group">
      <CardContent className="flex-grow pt-2">
        <AspectRatio 
          className="flex justify-center items-center bg-muted rounded-md" 
          ratio={4 / 3}
        >
          <img className="w-auto h-full object-cover" src="/sample-product.webp" alt='' />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex flex-col items-start text-sm">
        <div className="font-medium">{product.name}</div>
        <div className="group-hover:text-background text-foreground/50">{product.unitCount || 0} units</div>
      </CardFooter>
    </Card>
  );
}