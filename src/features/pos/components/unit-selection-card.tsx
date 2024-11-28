import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { UnitDto } from "@/features/unit/dto/unit.dto";

interface UnitSelectionCardProps {
  unit: UnitDto
}

export function UnitSelectionCard({ unit }: UnitSelectionCardProps) {
  return (
    <Card className="flex flex-col hover:bg-accent w-full h-full hover:text-background transition aspect-square group">
      <CardHeader className="space-y-0">
        <div className="font-medium text-2xl">{unit.name}</div>
        <div className="group-hover:text-background text-foreground/50">{`$ ${ (unit.price/100).toFixed(2) }`}</div>
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter className="flex flex-col items-start text-xs">
        <div className="group-hover:text-background text-foreground/50">{unit.quantity || 0} units left</div>
        <div className="group-hover:text-background">{unit.sku}</div>
      </CardFooter>
    </Card>
  );
}