import { request } from "@/lib/request";
import { Category } from "@/features/category/types/category";
import { CategoryDto } from "../types/category.dto";

interface CategoryQuery {
  q: string | undefined;
}

export const getCategories = async (query?: CategoryQuery): Promise<Category[]>  =>
  request({
    url: '/categories',
    method: 'GET',
    params: query
  });

export const getCategoryById = async ( categoryId: string ): Promise<Category> =>
  request({
    url: '/categories/' + categoryId,
    method: 'GET'
  });

export const createCategory = async ( categoryDto: CategoryDto): Promise<Category> =>
  request({
    url: '/categories',
    method: 'POST',
    data: categoryDto
  });

export const updateCategory = async ( categoryId: string, categoryDto: CategoryDto ): Promise<Category> =>
  request({
    url: '/categories/' + categoryId,
    method: 'PUT',
    data: categoryDto
  });

export const deleteCategory = async ( categoryId: string ): Promise<Category> =>
  request({
    url: '/categories/' + categoryId,
    method: 'DELETE'
  });