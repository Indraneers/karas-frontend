import { cn } from "@/lib/utils";
import { Sale } from "../types/sale";
import { StatusBadge } from "./status-badge";
import { TypographyH1 } from "@/components/ui/typography/h1";
import { CustomLink } from "@/components/link";
import { InfoField } from "../../../components/info-field";
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
        <TypographyH1>
          Order <span className="text-accen">#{sale.id}</span>
        </TypographyH1>
      </div>
      <div className="flex justify-between items-centers mt-1">
        <StatusBadge className="self-center" status={sale.status} />
        <div className="space-x-2">
          <EditButton className="w-8 h-8" to={'/sales/edit/' + sale.id} />
          <PrintButton className="w-8 h-8" to={'/invoice/' + sale.id + '?print=true'} />
        </div>
      </div>
      <InfoField className="mt-2" label="Initiated By">
        <CustomLink to={'/users' + sale.user.id}>
          {sale.user.username}
        </CustomLink>
      </InfoField>
      <div className="xl:flex justify-between gap-2 mt-2">
        <InfoField label="Created At">
          {sale.createdAt ? format(sale.createdAt, 'do MMM yyyy, hh:mm aa') : 'N/A'}
        </InfoField>
        <InfoField className="mt-2 xl:mt-0" label="Due At">
          {format(sale.dueAt, 'do MMM yyyy, hh:mm aa')}
        </InfoField>
      </div>
    </div>
  );
}