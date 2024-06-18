import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateAddressDto {
    @IsOptional()
    @IsString()
    street?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    province?: string;

    @IsOptional()
    @IsInt()
    zipcode?: number;
}
