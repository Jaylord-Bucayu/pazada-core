import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class PayBalanceDto {
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsNumber()
  @Min(0)
  amount: number;
}
