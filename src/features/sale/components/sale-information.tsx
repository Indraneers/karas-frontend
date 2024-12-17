import { cn } from "@/lib/utils";
import { Sale } from "../types/sale";
import { StatusBadge } from "./status-badge";
import { TypographyH1 } from "@/components/ui/typography/h1";
import { CustomLink } from "@/components/link";
import { SaleDetailElement } from "./sale-detail-element";
import { format } from 'date-fns';

interface SaleInformationProps {
  sale: Sale;
  className?: string;
}

export function SaleInformation({ sale, className }: SaleInformationProps) {
  return (
    <div className={cn([
      className
    ])}>
      <div className="flex justify-between items-center">
        <TypographyH1>
          Order #1111
        </TypographyH1>
        <StatusBadge className="text-md" status={sale.status} />
      </div>
      <div className="text-muted-foreground text-sm">
        Initiated by 
        <CustomLink className="ml-1" to={'/users' + sale.user.id}>
          {sale.user.username}
        </CustomLink>
      </div>
      <SaleDetailElement className="mt-4" label="Created At">
        {format(sale.created, 'do MMM yyyy (hh:mm aa)')}
      </SaleDetailElement>
      <SaleDetailElement className="mt-2" label="Due At">
        {format(sale.dueDate, 'do MMM yyyy (hh:mm aa)')}
      </SaleDetailElement>
    </div>
  );
}