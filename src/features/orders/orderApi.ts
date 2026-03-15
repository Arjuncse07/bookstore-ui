import axiosClient from "@/shared/api/axiosClient";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  OrderDTO,
  OrderSummary,
} from "./types";

export async function createOrder(
  request: CreateOrderRequest,
): Promise<CreateOrderResponse> {
  const { data } = await axiosClient.post("/orders/api/orders", request);
  return data;
}

export async function getOrders(): Promise<OrderSummary[]> {
  const { data } = await axiosClient.get("/orders/api/orders");
  return data;
}

export async function getOrder(orderNumber: string): Promise<OrderDTO> {
  const { data } = await axiosClient.get(`/orders/api/orders/${orderNumber}`);
  return data;
}
