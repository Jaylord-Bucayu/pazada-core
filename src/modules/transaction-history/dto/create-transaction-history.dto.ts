import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTransactionHistoryDto {
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsString()
  @IsNotEmpty()
  transaction_type: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

//   @IsNumber()
//   @IsNotEmpty()
//   previous_balance: number;

//   @IsNumber()
//   @IsNotEmpty()
//   new_balance: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
