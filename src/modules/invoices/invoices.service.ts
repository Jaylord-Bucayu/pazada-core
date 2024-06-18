import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from '../invoices/entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const createdInvoice = new this.invoiceModel(createInvoiceDto);
    return createdInvoice.save();
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find().exec();
  }

  async findOne(id: string): Promise<Invoice> {
    return this.invoiceModel.findById(id).exec();
  }

  async update(id: string, updateInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceModel.findByIdAndUpdate(id, updateInvoiceDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.invoiceModel.findByIdAndDelete(id).exec();
  }
}
