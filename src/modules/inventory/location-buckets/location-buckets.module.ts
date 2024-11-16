import { Module } from '@nestjs/common';
import { LocationBucketsService } from './location-buckets.service';
import { LocationBucketsController } from './location-buckets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationBucket, LocationBucketSchema } from './entities/location-bucket.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: LocationBucket.name, schema: LocationBucketSchema }])],
  controllers: [LocationBucketsController],
  providers: [LocationBucketsService],
})
export class LocationBucketsModule {}
