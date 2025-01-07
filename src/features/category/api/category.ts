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

export const createCategory = async ( categoryDto: CategoryDto, file?: File): Promise<Category> => {
  const formData = new FormData();
  
  // Append the categoryDto as a JSON string
  formData.append('data', new Blob([JSON.stringify(categoryDto)], { type: 'application/json' }));
  
  // Append the file if provided
  if (file) {
    formData.append('file', file);
  }

  console.log('sending', formData);

  return request({
    url: '/categories',
    method: 'POST',
    data: formData,
    headers: {
      "Content-Type": 'multipart/form-data'
    }
  });
};

export const updateCategory = async ( categoryId: string, categoryDto: CategoryDto, file?: File ): Promise<Category> => {
  const formData = new FormData();
  
  // Append the categoryDto as a JSON string
  formData.append('data', new Blob([JSON.stringify(categoryDto)], { type: 'application/json' }));
  
  // Append the file if provided
  if (file) {
    formData.append('file', file);
  }
  
  return request({
    url: '/categories/' + categoryId,
    method: 'PUT',
    data: formData,
    headers: {
      "Content-Type": 'multipart/form-data'
    }
  });
};

export const deleteCategory = async ( categoryId: string ): Promise<Category> =>
  request({
    url: '/categories/' + categoryId,
    method: 'DELETE'
  });