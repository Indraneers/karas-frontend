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

export const createProduct = async (productDto: ProductRequestDto): Promise<ProductResponseDto>  =>
  request({
    url: '/products',
    method: 'POST',
    data: productDto
  });

export const updateProduct = async (productId: string, productDto: ProductRequestDto): Promise<ProductResponseDto>  =>
  request({
    url: '/products/' + productId,
    method: 'PUT',
    data: productDto
  });

export const deleteProduct = async (productId: string): Promise<ProductResponseDto>  =>
  request({
    url: '/products/' + productId,
    method: 'DELETE'
  });