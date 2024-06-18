import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from 'src/modules/address/entities/address.entity';
import { Location, LocationSchema } from './entities/location.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
