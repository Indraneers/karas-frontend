import { Editable } from "@/components/editable";
import { TableCell, TableRow } from "@/components/ui/custom-table";
import { ItemCounter } from "../../item-counter";
import { DeleteButton } from "@/components/delete-button";

interface ItemOrderRow {
  img: string;
  name: string;
  price: number;
  quantity: number;
}

export function ItemOrderRow({ img, name, price }: ItemOrderRow) {
  const priceInDollar = '$' + (price / 100).toFixed(2);

  return (
    <TableRow>
      <TableCell className="p-4">
        <div className="gap-4 grid grid-cols-[auto,1fr]">
          {/* Item Image */}
          <img className="h-full self-stretch" src={img} loading="lazy" />
          {/* Item Info, Counter and Price */}
          <div>
            {/* Item Name */}
            <div>
              {name}
            </div>
            {/* Item Counter and Price */}
            <div className="flex justify-between items-center mt-4">
              <Editable>
                <span className="px-1">
                  $50.00
                </span>
              </Editable>
              <ItemCounter counter={1} />
            </div>
          </div>
        </div>
      </TableCell>
      {/* Item's Price */}
      <TableCell className="p-4 font-semibold text-center text-primary text-sm">
        {priceInDollar}
      </TableCell>
      {/* Delete Item */}
      <TableCell className="p-4">
        <div className="place-content-center grid w-full h-full">
          <DeleteButton />
        </div>
      </TableCell>
    </TableRow>
  );
}