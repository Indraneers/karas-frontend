import { request } from "@/lib/request";
import { SubcategoryRequestDto, SubcategoryResponseDto } from "../types/subcategory.dto";

interface SubcategoryQuery {
  q: string | undefined;
  categoryId: string | undefined;
}

export const getSubcategories = 
async (query?: SubcategoryQuery): Promise<SubcategoryResponseDto[]>  =>
  request({
    url: '/subcategories',
    method: 'GET',
    params: query
  });

export const getSubcategoryById = 
async ( subcategoryId: string ): Promise<SubcategoryResponseDto> =>
  request({
    url: '/subcategories/' + subcategoryId,
    method: 'GET'
  });

export const createSubcategory = 
async ( subcategoryDto: SubcategoryRequestDto, file?: File): Promise<SubcategoryResponseDto> => {
  const formData = new FormData();
  
  // Append the categoryDto as a JSON string
  formData.append('data', new Blob([JSON.stringify(subcategoryDto)], { type: 'application/json' }));
  
  // Append the file if provided
  if (file) {
    formData.append('file', file);
  }

  return request({
    url: '/subcategories',
    method: 'POST',
    data: formData,
    headers: {
      "Content-Type": 'multipart/form-data'
    }
  });
};

export const updateSubcategory = 
async ( subcategoryId: string, subcategoryDto: SubcategoryRequestDto, file?: File ): Promise<SubcategoryResponseDto> => {
  const formData = new FormData();
  
  // Append the categoryDto as a JSON string
  formData.append('data', new Blob([JSON.stringify(subcategoryDto)], { type: 'application/json' }));
  
  // Append the file if provided
  if (file) {
    formData.append('file', file);
  }

  return request({
    url: '/subcategories/' + subcategoryId,
    method: 'PUT',
    data: formData
  });
};

export const deleteSubcategory = 
async ( subcategoryId: string ): Promise<SubcategoryResponseDto> =>
  request({
    url: '/subcategories/' + subcategoryId,
    method: 'DELETE'
  });