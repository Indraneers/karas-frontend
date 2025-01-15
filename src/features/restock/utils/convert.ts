import { convertQuantityToQuantityDto } from "@/features/unit/util/convert";
import { Restock } from "../types/restock";
import { RestockItemRequestDto } from "../types/restock-item.dto";
import { RestockRequestDto } from "../types/restock.dto"; 
import { convertDateToLocaleDate } from "@/lib/date";

export function convertRestockToRestockDto(restock: Restock): RestockRequestDto {
  const restockItemDtos: RestockItemRequestDto[] = 
    restock.items.map((ri) => {
      if (ri.unit.product.variable) {
        return {
          quantity: convertQuantityToQuantityDto(ri.quantity),
          status: ri.status,
          unitId: ri.unit.id
        };
      }

      return {
        quantity: ri.quantity,
        status: ri.status,
        unitId: ri.unit.id
      };
    });

  return {
    id: restock.id,
    userId: restock.user.id,
    createdAt: convertDateToLocaleDate(new Date()),
    items: restockItemDtos
  };
}