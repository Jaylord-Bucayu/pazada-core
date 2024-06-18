import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLocationItemDto } from './dto/create-location-item.dto';
import { UpdateLocationItemDto } from './dto/update-location-item.dto';
import { LocationItem } from './entities/location-item.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Batch } from '../batch/entities/batch.entity';

@Injectable()
export class LocationItemsService {
  constructor(
    @InjectModel(LocationItem.name) private locationItemModel: Model<LocationItem>,
  ) {}
  
  create(createLocationItemDto: CreateLocationItemDto) {
    return 'This action adds a new locationItem';
  }

  findAll() {
    return `This action returns all locationItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} locationItem`;
  }

  update(id: number, updateLocationItemDto: UpdateLocationItemDto) {
    return `This action updates a #${id} locationItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} locationItem`;
  }

  async findByQuery(productId: string, locationId: string): Promise<LocationItem[]> {
    try {
      const query: any = {};

      if (productId) {
        query.item = productId;
      }

      if (locationId) {
        query.location = locationId;
      }

      const batches = await this.locationItemModel
        .find(query).populate('location').populate({
          path: 'batch',
          model: 'Batch'})
        .exec();

      return batches;
    } catch (error) {
      throw new BadRequestException(`Failed to find batches: ${error.message}`);
    }
  }
}
