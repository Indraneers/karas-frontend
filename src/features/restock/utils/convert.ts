import { Restock } from "../types/restock";
import { RestockItemRequestDto } from "../types/restock-item.dto";
import { RestockRequestDto } from "../types/restock.dto"; 

export function convertRestockToRestockDto(restock: Restock): RestockRequestDto {
  const restockItemDtos: RestockItemRequestDto[] = 
    restock.items.map((ri) => {
      return {
        quantity: ri.quantity,
        status: ri.status,
        unitId: ri.unit.id
      };
    });

  return {
    id: restock.id,
    userId: restock.user.id,
    items: restockItemDtos
  };
}