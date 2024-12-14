import { request } from "@/lib/request";
import { Product } from "@/types/product";
import { ProductDto } from "../types/product.dto";

interface ProductQuery {
  q?: string;
  categoryId?: string;
}

export const getProducts = async (query?: ProductQuery): Promise<Product[]>  =>
  request({
    url: '/products',
    method: 'GET',
    params: query
  });

export const getProductById = async (productId: string): Promise<Product>  =>
  request({
    url: '/products/' + productId,
    method: 'GET'
  });

export const createProduct = async (productDto: ProductDto): Promise<Product>  =>
  request({
    url: '/products',
    method: 'POST',
    data: productDto
  });

export const updateProduct = async (productId: string, productDto: ProductDto): Promise<Product>  =>
  request({
    url: '/products/' + productId,
    method: 'PUT',
    data: productDto
  });

export const deleteProduct = async (productId: string): Promise<Product>  =>
  request({
    url: '/products/' + productId,
    method: 'DELETE'
  });