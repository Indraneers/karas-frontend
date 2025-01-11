import { UserDto } from "@/features/user/types/user.dto";
import { RestockItemRequestDto, RestockItemResponseDto } from "./restock-item.dto";

export interface RestockRequestDto {
  id: string;
  items: RestockItemRequestDto[];
  userId: string;
  createdAt: Date;
}

export interface RestockResponseDto {
  id: string;
  items: RestockItemResponseDto[];
  user: UserDto
  createdAt: Date;
}