import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class TransferBalanceDto {
  @IsString()
  @IsNotEmpty()
  fromCustomerId: string;

  @IsString()
  @IsNotEmpty()
  toCustomerId: string;

  @IsNumber()
  @Min(0)
  amount: number;
}
