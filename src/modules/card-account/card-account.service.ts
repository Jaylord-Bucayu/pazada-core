import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardAccountDto } from './dto/create-card-account.dto';
import { UpdateCardAccountDto } from './dto/update-card-account.dto';
import { CardAccount } from './entities/card-account.entity'; // Assuming you've created the CardAccount schema

@Injectable()
export class CardAccountService {
  constructor(
    @InjectModel(CardAccount.name) // Inject the CardAccount model
    private readonly cardAccountModel: Model<CardAccount>,
  ) {}

  // Create a new CardAccount
  async create(createCardAccountDto: CreateCardAccountDto): Promise<CardAccount> {
    const createdCardAccount = new this.cardAccountModel(createCardAccountDto);
    return createdCardAccount.save();
  }

  // Find all CardAccounts
  async findAll(): Promise<CardAccount[]> {
    return this.cardAccountModel.find().exec();
  }

  // Find one CardAccount by ID
  async findOne(id: string): Promise<CardAccount | null> {
    return this.cardAccountModel.findById(id).exec();
  }

  // Update a CardAccount by ID
  async update(
    id: string,
    updateCardAccountDto: UpdateCardAccountDto,
  ): Promise<CardAccount | null> {
    return this.cardAccountModel.findByIdAndUpdate(id, updateCardAccountDto, { new: true }).exec();
  }

  // Remove a CardAccount by ID
  async remove(id: string): Promise<CardAccount | null> {
    return this.cardAccountModel.findByIdAndDelete(id).exec();
  }


  
}
