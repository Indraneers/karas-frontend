import { request } from "@/lib/request";
import { Product } from "@/types/product";
import { ProductDto } from "../dto/product.dto";

export const getProductById = async (productId: string): Promise<Product>  =>
  request({
    url: '/products/' + productId,
    method: 'GET'
  });

export const getProducts = async (): Promise<Product[]>  =>
  request({
    url: '/products',
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