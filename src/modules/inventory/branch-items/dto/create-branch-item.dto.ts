import { IsNotEmpty, IsMongoId, IsNumber, IsArray } from 'class-validator';

export class CreateBranchItemDto {
  @IsNotEmpty()
  @IsMongoId()
  branch: string; // Reference to the Branch entity

  @IsNotEmpty()
  @IsMongoId()
  item: string; // Reference to the Product entity

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsNumber()
  srp: number;

  @IsArray()
  @IsMongoId({ each: true })
  batch: string[]; // Reference to multiple Batch entities
}
