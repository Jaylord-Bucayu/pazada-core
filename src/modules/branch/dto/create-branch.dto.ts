import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateBranchDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsMongoId()
  address: string;

  @IsOptional()
  @IsMongoId()
  owner?: string;

}
