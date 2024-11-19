import { IsString, IsNotEmpty } from 'class-validator';

export class CheckBalanceDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;
}
