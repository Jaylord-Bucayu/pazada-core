import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTransactionHistoryDto {

  @IsNumber()
  @IsNotEmpty()
  C: number;  // 'C' field for some value

  @IsNumber()
  @IsNotEmpty()
  I: number;  // 'I' field (widget amount converted to integer)

  @IsNumber()
  @IsNotEmpty()
  B: number;  // 'S' field


  @IsNumber()
  @IsNotEmpty()
  S: number;  // 'S' field

  @IsNumber()
  @IsNotEmpty()
  P: number;  // 'P' field

  @IsNumber()
  @IsNotEmpty()
  T: number;  // 'T' field (timestamp)

  @IsNumber()
  @IsNotEmpty()
  A: number;  // 'A' field (status or other related field)

  @IsString()
  @IsNotEmpty()
  H: string;  // 'H' field (hash or related field)


}
