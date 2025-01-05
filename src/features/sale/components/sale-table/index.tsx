import { itemColumns } from "./item-columns";
import { Sale } from "../../types/sale";
import { ItemServiceDataTable } from "../item-service-data-table";
import { serviceColumns } from "./service-columns";

export function SaleTable({ sale } : { sale: Sale }) {
  return (
    <ItemServiceDataTable
      itemColumns={itemColumns}
      serviceColumns={serviceColumns}
      sale={sale}
    />
  );
}