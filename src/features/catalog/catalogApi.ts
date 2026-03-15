import axiosClient from "@/shared/api/axiosClient";
import type { PagedResult, Product } from "./types";

export async function getProducts(page = 1): Promise<PagedResult<Product>> {
  const { data } = await axiosClient.get(`/catalog/api/products?page=${page}`);
  return data;
}

export async function getProductByCode(code: string): Promise<Product> {
  const { data } = await axiosClient.get(`/catalog/api/products/${code}`);
  return data;
}
