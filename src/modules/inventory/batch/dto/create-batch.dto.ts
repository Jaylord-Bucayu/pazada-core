import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsNumber, IsDate, IsArray, ValidateNested } from 'class-validator';
import { BranchQuantityDto } from './create-batch-branch.dto';
import { LocationQuantityDto } from './create-batch-locatiton.dto';

export class CreateBatchDto {

  @IsNotEmpty()
  mainBranch:string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  item: string;

  @IsOptional()
  @IsString()
  supplier?: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsOptional()
  @IsDate()
  mfg?: Date;

  @IsOptional()
  @IsDate()
  exp?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  documents?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BranchQuantityDto)
  branch: BranchQuantityDto[]  = [];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationQuantityDto)
  location: LocationQuantityDto[]  = [];;

}
