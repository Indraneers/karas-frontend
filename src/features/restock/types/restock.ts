import { UserDto } from "@/features/user/types/user.dto";
import { RestockItemRequestDto } from "./restock-item.dto";

export interface Restock {
  id: string;
  items: RestockItemRequestDto[];
  user: UserDto;
  createdAt: Date;
}