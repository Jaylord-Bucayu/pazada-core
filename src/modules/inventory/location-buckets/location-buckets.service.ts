import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationBucketDto } from './dto/create-location-bucket.dto';
import { UpdateLocationBucketDto } from './dto/update-location-bucket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LocationBucket } from './entities/location-bucket.entity';
import { Model } from 'mongoose';

@Injectable()
export class LocationBucketsService {
  constructor(
    @InjectModel(LocationBucket.name) private locationBucketModel: Model<LocationBucket>,
  ) {}

  async create(createLocationBucketDto: CreateLocationBucketDto): Promise<LocationBucket> {
    try {
      const createdLocationBucket = new this.locationBucketModel(createLocationBucketDto);
      return await createdLocationBucket.save();
    } catch (error) {
      throw new BadRequestException(`Failed to create location bucket: ${error.message}`);
    }
  }

  async findAll(): Promise<LocationBucket[]> {
    return this.locationBucketModel.find().exec();
  }

  async findById(id: string): Promise<LocationBucket> {
    const locationBucket = await this.locationBucketModel.findById(id).exec();
    if (!locationBucket) {
      throw new NotFoundException(`Location bucket with ID ${id} not found`);
    }
    return locationBucket;
  }

  async update(id: string, updateLocationBucketDto: UpdateLocationBucketDto): Promise<LocationBucket> {
    const updatedLocationBucket = await this.locationBucketModel.findByIdAndUpdate(id, updateLocationBucketDto, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updatedLocationBucket) {
      throw new NotFoundException(`Location bucket with ID ${id} not found`);
    }
    return updatedLocationBucket;
  }

  async remove(id: string): Promise<void> {
    const result = await this.locationBucketModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Location bucket with ID ${id} not found`);
    }
  }
}
