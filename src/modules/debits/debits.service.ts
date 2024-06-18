import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Debit } from './entities/debit.entity';
import { CreateDebitDto } from './dto/create-debit.dto';
import { UpdateDebitDto } from './dto/update-debit.dto';

@Injectable()
export class DebitsService {
  constructor(@InjectModel(Debit.name) private readonly debitModel: Model<Debit>) {}

  async create(createDebitDto: CreateDebitDto): Promise<Debit> {
    const debit = new this.debitModel(createDebitDto);
    return debit.save();
  }

  async findAll(): Promise<Debit[]> {
    return this.debitModel.find().exec();
  }

  async findOne(id: string): Promise<Debit> {
    return this.debitModel.findById(id).exec();
  }

  async update(id: string, updateDebitDto: UpdateDebitDto): Promise<Debit> {
    return this.debitModel.findByIdAndUpdate(id, updateDebitDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.debitModel.findByIdAndDelete(id).exec();
  }
}
