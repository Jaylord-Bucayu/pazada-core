import { IsNotEmpty, IsNumber, IsString, IsMongoId } from 'class-validator';

export class CreateCardAccountDto {
  @IsMongoId()  // Ensures that the customer_id is a valid MongoDB ObjectId
  @IsNotEmpty()
  customer_id: string;

  @IsNumber()
  @IsNotEmpty()
  issuance_amount: number;

  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @IsString()
  @IsNotEmpty()
  store_id: string; // Merchant ID

  @IsNumber()
  @IsNotEmpty()
  payment_amount: number;

  @IsString()
  @IsNotEmpty()
  timestamp: string; // ISO string or Unix timestamp

  @IsString()
  @IsNotEmpty()
  hash: string; // Includes the previous hash
}
