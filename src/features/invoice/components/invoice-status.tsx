import { Badge } from "@/components/ui/badge";
import { StatusEnum } from "@/features/sale/types/sale";

export function InvoiceStatus({ statusEnum }: { statusEnum: StatusEnum }) {
  return (
    <>
      {statusEnum === StatusEnum.PAID && 
      <Badge className="bg-green-500 shadow-none font-bold text-xl">PAID</Badge>
      }
      {statusEnum === StatusEnum.HOLD && 
      <Badge className="bg-amber-500 shadow-none font-bold text-xl">HOLD</Badge>
      }
    </>
  );
}