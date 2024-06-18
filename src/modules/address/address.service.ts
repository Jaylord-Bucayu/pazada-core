import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AddressService {

  constructor(@InjectModel(Address.name) private addressModel: Model<Address>) {}
  
  create(createAddressDto: CreateAddressDto) {
    const createdAddress = new this.addressModel(createAddressDto);
        return createdAddress.save();
  }

  findAll() {
    return this.addressModel.find().exec();
  }

  findOne(id: string) {
    return this.addressModel.findById(id).exec();
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    return this.addressModel.findByIdAndUpdate(id, updateAddressDto, { new: true }).exec();
  }
  
  remove(id: string) {
    return this.addressModel.findByIdAndDelete(id).exec();
  }
}
