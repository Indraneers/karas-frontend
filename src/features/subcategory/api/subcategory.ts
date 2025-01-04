import { request } from "@/lib/request";
import { SubcategoryRequestDto, SubcategoryResponseDto } from "../types/subcategory.dto";

interface SubcategoryQuery {
  q: string | undefined;
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
async ( subcategoryDto: SubcategoryRequestDto): Promise<SubcategoryResponseDto> =>
  request({
    url: '/subcategories',
    method: 'POST',
    data: subcategoryDto
  });

export const updateSubcategory = 
async ( subcategoryId: string, subcategoryDto: SubcategoryRequestDto ): Promise<SubcategoryResponseDto> =>
  request({
    url: '/subcategories/' + subcategoryId,
    method: 'PUT',
    data: subcategoryDto
  });

export const deleteSubcategory = 
async ( subcategoryId: string ): Promise<SubcategoryResponseDto> =>
  request({
    url: '/subcategories/' + subcategoryId,
    method: 'DELETE'
  });