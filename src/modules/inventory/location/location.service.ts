import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(@InjectModel(Location.name) private locationModel: Model<Location>) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
      const createdLocation = new this.locationModel(createLocationDto);
      return createdLocation.save();
  }

  async findAll(): Promise<Location[]> {
      return this.locationModel.find().populate('address').exec();
  }

  async findOne(id: string): Promise<Location> {
      return this.locationModel.findById(id).populate('address').exec();
  }

  async update(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
      return this.locationModel.findByIdAndUpdate(id, updateLocationDto, { new: true }).populate('address').exec();
  }

  async remove(id: string): Promise<Location> {
      return this.locationModel.findByIdAndDelete(id).exec();
  }
}
