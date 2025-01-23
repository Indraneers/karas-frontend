import { UserDto } from "@/features/user/types/user.dto";
import { RestockItem } from "./restock-item";

export interface Restock {
  id: string;
  items: RestockItem[];
  user: UserDto;
  createdAt: Date;
}