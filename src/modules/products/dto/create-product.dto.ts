import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsArray, IsMongoId } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  readonly price: number = 0.00;

  @IsNumber()
  @IsOptional()
  readonly cost: number = 0.00;

  @IsNumber()
  @IsOptional()
  readonly reOrderPoint: number = 0;

  @IsNumber()
  @IsOptional()
  readonly creditPrice: number = 0;

  @IsBoolean()
  @IsOptional()
  readonly isActive: boolean = true;

  @IsString()
  readonly description: string;

  @IsArray()
  @IsOptional()
  readonly images: string[] = [];

  @IsMongoId()
  @IsOptional()
  readonly inventoryLocation?: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  readonly sku: string;

  @IsString()
  @IsOptional()
  readonly receiptAlias: string = "";

  @IsString()
  @IsOptional()
  readonly barcode: string = "";

  @IsString()
  @IsOptional()
  readonly unit: string = "";

  @IsString()
  @IsOptional()
  readonly stock: string = "0";
}
