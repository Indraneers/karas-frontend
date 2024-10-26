import { Table, TableHead, TableHeader, TableBody } from "@/components/ui/custom-table";
import ValvolineOilSample from './asset/valvoline-oil.png';
import { ItemOrderRow } from "./components/item-order-row";

export interface ItemOrderTableProps {
  className?: string;
}

export function ItemOrderTable({ className }: ItemOrderTableProps) {
  return (
    <Table className={className}>
      {/* Table Header */}
      <TableHeader>
        <TableHead className="w-[350px]">
          Product
        </TableHead>
        <TableHead className="text-center">
          Subtotal
        </TableHead>
        <TableHead className="text-center">
          Delete
        </TableHead>
      </TableHeader>
      {/* Table Body */}
      <TableBody className="mt-8">
        <ItemOrderRow
          img={ValvolineOilSample}
          name="VALVOLINE VR1 RACING MOTOR OIL SAE 20W-50"
          price={5000}
          quantity={1}
        />
        <ItemOrderRow
          img={ValvolineOilSample}
          name="VALVOLINE VR1 RACING MOTOR OIL SAE 20W-50"
          price={5000}
          quantity={1}
        />
        <ItemOrderRow
          img={ValvolineOilSample}
          name="VALVOLINE VR1 RACING MOTOR OIL SAE 20W-50"
          price={5000}
          quantity={1}
        />
        <ItemOrderRow
          img={ValvolineOilSample}
          name="VALVOLINE VR1 RACING MOTOR OIL SAE 20W-50"
          price={5000}
          quantity={1}
        />
        <ItemOrderRow
          img={ValvolineOilSample}
          name="VALVOLINE VR1 RACING MOTOR OIL SAE 20W-50"
          price={5000}
          quantity={1}
        />
        <ItemOrderRow
          img={ValvolineOilSample}
          name="VALVOLINE VR1 RACING MOTOR OIL SAE 20W-50"
          price={5000}
          quantity={1}
        />
      </TableBody>
    </Table>
  );
}