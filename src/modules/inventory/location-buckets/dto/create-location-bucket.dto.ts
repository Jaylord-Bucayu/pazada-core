import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateLocationBucketDto {
  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly location: string;
}
