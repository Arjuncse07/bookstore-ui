export interface Product {
  code: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

export interface PagedResult<T> {
  data: T[];
  totalElements: number;
  pageNumber: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}
