import { request } from "@/lib/request";
import { Product } from "@/types/product";

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