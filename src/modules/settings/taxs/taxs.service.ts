import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tax } from './entities/tax.entity';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { BulkCreateTaxDto } from './dto/create-bulk-tax.dto';

@Injectable()
export class TaxsService {
  constructor(@InjectModel(Tax.name) private readonly taxModel: Model<Tax>) {}

  async create(createTaxDto: CreateTaxDto): Promise<Tax> {
    const createdTax = new this.taxModel(createTaxDto);
    return createdTax.save();
  }

  async findAll(): Promise<Tax[]> {
    return this.taxModel.find().exec();
  }

  async findOne(id: string): Promise<Tax> {
    const tax = await this.taxModel.findById(id).exec();
    if (!tax) {
      throw new NotFoundException(`Tax with ID ${id} not found`);
    }
    return tax;
  }

  async update(id: string, updateTaxDto: UpdateTaxDto): Promise<Tax> {
    const updatedTax = await this.taxModel.findByIdAndUpdate(id, updateTaxDto, { new: true }).exec();
    if (!updatedTax) {
      throw new NotFoundException(`Tax with ID ${id} not found`);
    }
    return updatedTax;
  }

  async remove(id: string): Promise<void> {
    const result = await this.taxModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Tax with ID ${id} not found`);
    }
  }

  async bulkCreate(bulkCreateTaxDto: BulkCreateTaxDto): Promise<Tax[]> {

    await this.taxModel.deleteMany({}).exec();
    
    const createdTaxes: Tax[] = [];
    
    for (const taxData of bulkCreateTaxDto.taxes) {
      const { name, taxName } = taxData;
      // Check if a tax with the same name and taxName already exists
      const existingTax = await this.taxModel.findOne({ name, taxName }).exec();
      if (existingTax) {
        // If a tax with the same name and taxName exists, skip adding it
        continue;
      }

      // If the tax does not exist, create it
      const newTax = await this.taxModel.create(taxData);
      createdTaxes.push(newTax);
    }

    return createdTaxes;
  }

}
