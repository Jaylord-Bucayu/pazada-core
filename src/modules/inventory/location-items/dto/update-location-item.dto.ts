import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationItemDto } from './create-location-item.dto';

export class UpdateLocationItemDto extends PartialType(CreateLocationItemDto) {}
