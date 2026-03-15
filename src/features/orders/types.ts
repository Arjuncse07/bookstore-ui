export interface OrderItem {
  code: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  customer: Customer;
  deliveryAddress: Address;
}

export interface CreateOrderResponse {
  orderNumber: string;
}

export interface OrderSummary {
  orderNumber: string;
  status: string;
}

export interface OrderDTO {
  orderNumber: string;
  userName: string;
  items: OrderItem[];
  customer: Customer;
  deliveryAddress: Address;
  status: string;
  comments?: string;
  createdAt: string;
}
