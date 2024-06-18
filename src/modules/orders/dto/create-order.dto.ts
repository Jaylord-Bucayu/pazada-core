import { Product } from "src/modules/products/entities/product.entity";

// src/orders/dto/create-order.dto.ts
export class CreateOrderDto {
    payment?: string;
    creditDeduction?: number;
    user?: string;
    products?: Product[];
  }
  