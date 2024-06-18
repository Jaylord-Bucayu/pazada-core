import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateLocationDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsMongoId()
    address: string;
}
