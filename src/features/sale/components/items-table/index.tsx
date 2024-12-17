import { columns } from "./columns";
import { Sale } from "../../types/sale";
import { ItemsDataTable } from "./items-data-table";

export function ItemsTable({ sale } : { sale: Sale }) {
  return (
    <ItemsDataTable
      columns={columns}
      sale={sale}
    />
  );
}