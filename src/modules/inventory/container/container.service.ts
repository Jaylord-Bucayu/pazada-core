import { Injectable } from '@nestjs/common';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpdateContainerDto } from './dto/update-container.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Container } from './entities/container.entity';
import { Model } from 'mongoose';

@Injectable()
export class ContainerService {

  constructor(@InjectModel('Container') private readonly containerModel:Model<Container>){}
  create(createContainerDto: CreateContainerDto) {
    const department = new this.containerModel(createContainerDto);
    return department.save();
  }

  findAll() {
    return this.containerModel.find().exec();
  }

  findOne(id: number) {
    return this.containerModel.findById(id).exec();
  }

 async update(id: number, updateContainerDto: UpdateContainerDto) {

  return this.containerModel.findByIdAndUpdate(id, updateContainerDto, { new: true }).exec();
  }

 async remove(id: number) {
    return await this.containerModel.findByIdAndDelete(id)
  }
}
