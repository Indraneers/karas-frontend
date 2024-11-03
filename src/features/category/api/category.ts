import { request } from "@/lib/request";
import { Category } from "@/types/category";

export const getCategories = async (): Promise<Category[]>  =>
  request({
    url: '/categories',
    method: 'GET'
  });

export const getCategoryById = async ( categoryId: string ): Promise<Category> =>
  request({
    url: '/categories/' + categoryId,
    method: 'GET'
  });