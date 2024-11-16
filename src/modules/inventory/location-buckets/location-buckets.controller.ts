import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationBucketsService } from './location-buckets.service';
import { CreateLocationBucketDto } from './dto/create-location-bucket.dto';
import { UpdateLocationBucketDto } from './dto/update-location-bucket.dto';
import { LocationBucket } from './entities/location-bucket.entity';

@Controller('location-buckets')
export class LocationBucketsController {
  constructor(private readonly locationBucketsService: LocationBucketsService) {}

  @Post()
  async create(@Body() createLocationBucketDto: CreateLocationBucketDto): Promise<LocationBucket> {
    return this.locationBucketsService.create(createLocationBucketDto);
  }

  @Get()
  async findAll(): Promise<LocationBucket[]> {
    return this.locationBucketsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<LocationBucket> {
    return this.locationBucketsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLocationBucketDto: UpdateLocationBucketDto): Promise<LocationBucket> {
    return this.locationBucketsService.update(id, updateLocationBucketDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.locationBucketsService.remove(id);
  }
}
