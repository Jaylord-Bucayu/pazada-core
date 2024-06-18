import { IsArray, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreatePackageDto {
  @IsMongoId()
  @IsNotEmpty()
  container: string;

  @IsArray()
  @IsNotEmpty()
  products: {
    product: string;
    quantity: number;
  }[];
}
