import { request } from "@/lib/request";
import { SubcategoryDto } from "../types/subcategory.dto";
import { Subcategory } from "../types/subcategory";

interface SubcategoryQuery {
  q: string | undefined;
}

export const getSubcategories = async (query?: SubcategoryQuery): Promise<Subcategory[]>  =>
  request({
    url: '/subcategories',
    method: 'GET',
    params: query
  });

export const getSubcategoryById = async ( subcategoryId: string ): Promise<Subcategory> =>
  request({
    url: '/subcategories/' + subcategoryId,
    method: 'GET'
  });

export const createSubcategory = async ( subcategoryDto: SubcategoryDto): Promise<Subcategory> =>
  request({
    url: '/subcategories',
    method: 'POST',
    data: subcategoryDto
  });

export const updateSubcategory = async ( subcategoryId: string, subcategoryDto: SubcategoryDto ): Promise<Subcategory> =>
  request({
    url: '/subcategories/' + subcategoryId,
    method: 'PUT',
    data: subcategoryDto
  });

export const deleteSubcategory = async ( subcategoryId: string ): Promise<Subcategory> =>
  request({
    url: '/subcategories/' + subcategoryId,
    method: 'DELETE'
  });