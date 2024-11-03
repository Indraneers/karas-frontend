import { request } from "@/lib/request";
import { Product } from "@/types/product";

export const getProductById = async (productId: string): Promise<Product>  =>
  request({
    url: '/products/' + productId,
    method: 'GET'
  });