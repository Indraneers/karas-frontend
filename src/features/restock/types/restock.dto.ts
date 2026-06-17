import { UserDto } from "@/features/user/types/user.dto";
import { RestockItemRequestDto, RestockItemResponseDto } from "./restock-item.dto";

export interface RestockRequestDto {
  id: string;
  items: RestockItemRequestDto[];
  userId: string;
  note: string;
}

export interface RestockResponseDto {
  id: string;
  items: RestockItemResponseDto[];
  user: UserDto;
  note: string;
  createdAt: Date;
}