import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductSaleDto {
  @IsNotEmpty()
  product: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

}

export class CreateSaleDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductSaleDto)
  @IsNotEmpty()
  products: ProductSaleDto[];

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  subTotalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  creditDeduction: number;

  @IsNumber()
  @IsNotEmpty()
  change: number;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  customer: string;

  @IsString()
  @IsNotEmpty()
  salesPerson: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  discount_entire_sale: number;

  @IsNumber()
  @IsNotEmpty()
  discount_percent_sale: number;

  @IsNumber()
  @IsNotEmpty()
  number_of_items_sold: number;
}
