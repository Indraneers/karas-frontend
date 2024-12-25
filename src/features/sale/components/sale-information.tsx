import { cn } from "@/lib/utils";
import { Sale } from "../types/sale";
import { StatusBadge } from "./status-badge";
import { TypographyH1 } from "@/components/ui/typography/h1";
import { CustomLink } from "@/components/link";
import { SaleDetailElement } from "./sale-detail-element";
import { format } from 'date-fns';
import { EditButton } from "@/components/edit-button";
import { PrintButton } from "@/components/print-button";

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
        <div className="flex items-center gap-2">
          <TypographyH1>
          Order #1111
          </TypographyH1>
          <EditButton className="w-8 h-8" to={'/sales/edit/' + sale.id} />
          <PrintButton className="w-8 h-8" to={'/invoice/' + sale.id + '?print=true'} />
        </div>
        <StatusBadge className="text-md" status={sale.status} />
      </div>
      <div className="text-muted-foreground text-sm">
        Initiated by 
        <CustomLink className="ml-1" to={'/users' + sale.user.id}>
          {sale.user.username}
        </CustomLink>
      </div>
      <div className="flex justify-between gap-2 mt-2">
        <SaleDetailElement label="Created At">
          {format(sale.created, 'do MMM yyyy, hh:mm aa')}
        </SaleDetailElement>
        <SaleDetailElement label="Due At">
          {format(sale.dueDate, 'do MMM yyyy, hh:mm aa')}
        </SaleDetailElement>
      </div>
    </div>
  );
}