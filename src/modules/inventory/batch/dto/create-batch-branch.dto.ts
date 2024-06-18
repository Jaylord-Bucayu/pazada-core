import { IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class BranchQuantityDto {
  
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsNotEmpty()
  @IsMongoId()
  branchId: string;
}
