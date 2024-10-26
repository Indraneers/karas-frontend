import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";

import AddIcon from '../../assets/add.svg?react';
import { Unit } from "@/types/unit";
import { DeleteButton } from "@/components/delete-button";

export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: () => (
      <Button className="border-0 bg-secondary rounded-b-none rounded-tl-md rounded-tr-none w-full h-full font-bold text-base text-white">
        <span className="mr-1"><AddIcon /></span>
        Add Unit/Size
      </Button>
    ),
    cell: ({ row }) => (
      <div className="place-content-center grid">      
        <Checkbox
          className="flex !w-[20px] !h-[20px]"
          iconClassName="w-[20px] h-[20px]"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: 'Product'
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => {
      const units = row.getValue('units') as Unit[];
      return units.map((u) => (
        <div className="py-6" key={u.id + '-sku-' + u.sku}>
          {u.sku}
        </div>
      ));
    }
  },
  {
    accessorKey: 'units',
    header: 'Unit',
    cell: ({ row }) => {
      const units = row.getValue('units') as Unit[];
      return units.map((u) => (
        <div className="py-6" key={u.id + u.name}>
          {u.name}
        </div>
      ));
    }
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const units = row.getValue('units') as Unit[];
      return units.map((u) => (
        <div className="py-6" key={u.id + '-price-' + u.price}>
          {'$' + (u.price/100).toFixed(2)}
        </div>
      ));
    }
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => {
      const units = row.getValue('units') as Unit[];
      return units.map((u) => (
        <div className="py-6" key={u.id + '-quantity-' + u.quantity}>
          {u.quantity}
        </div>
      ));
    }
  },
  {
    accessorKey: 'delete',
    header: 'Delete',
    cell: ({ row }) => {
      const units = row.getValue('units') as Unit[];
      return units.map((u) => (
        <div className="py-6" key={u.id + '-delete'}>
          <DeleteButton />
        </div>
      ));
    }
  }
];