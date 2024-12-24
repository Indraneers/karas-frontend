import { cn } from "@/lib/utils";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { Edit, Phone, RotateCcw, SquarePlus } from "lucide-react";
import { CustomerDto } from "@/features/customer/types/customer.dto";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CustomerInformationProps {
  className?: string;
  customer: CustomerDto | undefined;
}

export function CustomerInformation({ customer, className } : CustomerInformationProps) {
  if (!customer) {
    return 'empty...';
  }
  return (
    <div className={cn([
      className
    ])}>
      <TypographyH3>
        Customer Information
      </TypographyH3>
      <div className="gap-2 grid grid-cols-[2fr,auto,1fr] mt-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="min-h-6 font-medium text-md">
              {customer.name}
            </div>
            <Badge variant="outline" className={cn([
              "border-primary px-1 py-0 rounded-full h-4 font-normal text-[10px] text-primary",
              'hidden',
              customer.contact && 'flex'
            ])}>
              <Phone className="mr-1 w-3" /> {customer.contact || '-'}
            </Badge>
          </div>
          <div className="min-h-8 font-medium text-[10px] text-muted-foreground">
            {customer.address}
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex justify-center items-center gap-4">
          <SquarePlus />
          <Edit />
          <RotateCcw />
        </div>
      </div>
    </div>
  );
}