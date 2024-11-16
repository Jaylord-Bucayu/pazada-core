import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationBucketDto } from './create-location-bucket.dto';

export class UpdateLocationBucketDto extends PartialType(CreateLocationBucketDto) {}
