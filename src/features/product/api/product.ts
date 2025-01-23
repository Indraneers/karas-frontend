import { request } from "@/lib/request";
import { ProductRequestDto, ProductResponseDto } from "../types/product.dto";

interface ProductQuery {
  q?: string;
  subcategoryId?: string;
}

export const getProducts = async (query?: ProductQuery): Promise<ProductResponseDto[]>  =>
  request({
    url: '/products',
    method: 'GET',
    params: query
  });

export const getProductById = async (productId: string): Promise<ProductResponseDto>  =>
  request({
    url: '/products/' + productId,
    method: 'GET'
  });

export const createProduct = async (productDto: ProductRequestDto, file?: File): Promise<ProductResponseDto>  => {
  const formData = new FormData();
  
  // Append the categoryDto as a JSON string
  formData.append('data', new Blob([JSON.stringify(productDto)], { type: 'application/json' }));
  
  // Append the file if provided
  if (file) {
    formData.append('file', file);
  }

  return request({
    url: '/products',
    method: 'POST',
    data: formData
  });
};

export const updateProduct = async (productId: string, productDto: ProductRequestDto, file?: File): Promise<ProductResponseDto>  => {
  const formData = new FormData();
  
  // Append the categoryDto as a JSON string
  formData.append('data', new Blob([JSON.stringify(productDto)], { type: 'application/json' }));
  
  // Append the file if provided
  if (file) {
    formData.append('file', file);
  }

  return request({
    url: '/products/' + productId,
    method: 'PUT',
    data: formData
  });
};

export const deleteProduct = async (productId: string): Promise<ProductResponseDto>  =>
  request({
    url: '/products/' + productId,
    method: 'DELETE'
  });