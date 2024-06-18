import { IsString, IsNotEmpty, IsEmail, IsOptional, IsMongoId } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsMongoId()
  address: string;
}
