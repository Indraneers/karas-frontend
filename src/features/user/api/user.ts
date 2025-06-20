import { request } from "@/lib/request";
import { UserDto } from "../types/user.dto";

export const getUsers = async (): Promise<UserDto[]> =>
  request({
    url: '/users',
    method: 'GET'
  });