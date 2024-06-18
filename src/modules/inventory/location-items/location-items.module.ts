import { Module } from '@nestjs/common';
import { LocationItemsService } from './location-items.service';
import { LocationItemsController } from './location-items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationItem } from './entities/location-item.entity';
import { LocationSchema } from '../location/entities/location.entity';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: LocationItem.name, schema: LocationSchema }])],
  controllers: [LocationItemsController],
  providers: [LocationItemsService],
})
export class LocationItemsModule {}
