import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBatchTransferDTO  {
    

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsNotEmpty()
  @IsString()
  notes: string;

  @IsNotEmpty()
  @IsString()
  receivedBy: string;

  @IsNotEmpty()
  @IsString()
  toType: string;

  @IsNotEmpty()
  @IsString()
  toBranch: string;


  @IsNotEmpty()
  @IsString()
  fromBranchId: string;

  @IsNotEmpty()
  @IsString()
  batchId: string;
  
    

}