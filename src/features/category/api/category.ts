import { request } from "@/lib/request";
import { Category } from "@/types/category";

export const getCategories = async (): Promise<Category[]>  =>
  request({
    url: '/categories',
    method: 'GET'
  });