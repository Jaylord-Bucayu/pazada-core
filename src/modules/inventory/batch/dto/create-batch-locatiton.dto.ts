import { IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationQuantityDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsNotEmpty()
  @IsMongoId()
  locationId: string;
}
