import { cn } from "@/lib/utils";
import { Sale } from "../types/sale";
import { StatusBadge } from "./status-badge";
import { TypographyH1 } from "@/components/ui/typography/h1";
import { CustomLink } from "@/components/link";
import { SaleDetailElement } from "./sale-detail-element";
import { format } from 'date-fns';
import { EditButton } from "@/components/edit-button";
import { PrintButton } from "@/components/print-button";
import { Skeleton } from "@/components/ui/skeleton";

interface SaleInformationProps {
  sale: Sale | null;
  className?: string;
  isLoading?: boolean;
}

export function SaleInformation({ sale, className, isLoading = false }: SaleInformationProps) {
  if (isLoading || !sale) {
    return (
      <div>
        <Skeleton className="w-full h-12" />
        <Skeleton className="mt-2 w-full h-8" />
        <Skeleton className="mt-4 w-[100px] h-8" />
        <Skeleton className="mt-4 w-full h-8" />
      </div>
    );
  }

  return (
    <div className={cn([
      className
    ])}>
      <div className="flex justify-between items-center">
        <TypographyH1>
          Order <span className="text-accen">#{sale.id}</span>
        </TypographyH1>
      </div>
      <div className="flex justify-between items-centers mt-1">
        <StatusBadge className="text-md" status={sale.status} />
        <div className="space-x-2">
          <EditButton className="w-8 h-8" to={'/sales/edit/' + sale.id} />
          <PrintButton className="w-8 h-8" to={'/invoice/' + sale.id + '?print=true'} />
        </div>
      </div>
      <SaleDetailElement className="mt-2" label="Initiated By">
        <CustomLink to={'/users' + sale.user.id}>
          {sale.user.username}
        </CustomLink>
      </SaleDetailElement>
      <div className="flex justify-between gap-2 mt-2">
        <SaleDetailElement label="Created At">
          {format(sale.createdAt, 'do MMM yyyy, hh:mm aa')}
        </SaleDetailElement>
        <SaleDetailElement label="Due At">
          {format(sale.dueAt, 'do MMM yyyy, hh:mm aa')}
        </SaleDetailElement>
      </div>
    </div>
  );
}