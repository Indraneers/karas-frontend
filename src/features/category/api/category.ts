import { request } from "@/lib/request";
import { Category } from "@/types/category";
import { CreateCategoryDto } from "../dto/create-category.dto";

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

export const createCategory = async ( categoryDto: CreateCategoryDto): Promise<Category> =>
  request({
    url: '/categories',
    method: 'POST',
    data: categoryDto
  });