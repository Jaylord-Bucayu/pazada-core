import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Business } from './entities/business.entity';
import { Model } from 'mongoose';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name)
    private readonly businessModel : Model<Business>  ){}

 async create(createBusinessDto: CreateBusinessDto) {
   const busines = new this.businessModel(createBusinessDto);
  return await busines.save();
  }

  async findAll() {
    return await this.businessModel.find();
  }

  async findOne(id: string) {
    return await this.businessModel.findById(id);
  }

  async update(id: string, updateBusinessDto: UpdateBusinessDto) {
    return await this.businessModel.findByIdAndUpdate(id,updateBusinessDto);
  }


  async remove(id: string) {
    return await this.businessModel.findByIdAndDelete(id);
  }
}
