import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Supplier } from './entities/supplier.entity';
import { Model } from 'mongoose';

@Injectable()
export class SupplierService {
  constructor(@InjectModel(Supplier.name) private supplierModel: Model<Supplier>) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const createdSupplier = new this.supplierModel(createSupplierDto);
    return createdSupplier.save();
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierModel.find().populate('address').exec();
  }

  async findOne(id: string): Promise<Supplier> {
    return this.supplierModel.findById(id).populate('address').exec();
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    return this.supplierModel.findByIdAndUpdate(id, updateSupplierDto, { new: true }).populate('address').exec();
  }

  async remove(id: string): Promise<Supplier> {
    return this.supplierModel.findByIdAndDelete(id).exec();
  }
}
