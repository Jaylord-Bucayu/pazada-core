import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBranchItemDto } from './dto/create-branch-item.dto';
import { UpdateBranchItemDto } from './dto/update-branch-item.dto';
import { BranchItem } from './entities/branch-item.entity'; // Adjust the path based on your project structure

@Injectable()
export class BranchItemsService {
  constructor(
    @InjectModel(BranchItem.name) private branchItemModel: Model<BranchItem>,
  ) {}

  async create(createBranchItemDto: CreateBranchItemDto): Promise<BranchItem> {
    try {
      const createdBranchItem = new this.branchItemModel(createBranchItemDto);
      return await createdBranchItem.save();
    } catch (error) {
      throw new BadRequestException(`Failed to create branch item: ${error.message}`);
    }
  }

  async findAll(): Promise<BranchItem[]> {
    return await this.branchItemModel.find().populate('branch').populate('batch').exec();
  }

  async findOne(id: string): Promise<BranchItem> {
    return await this.branchItemModel.findById(id).exec();
  }

  async update(id: string, updateBranchItemDto: UpdateBranchItemDto): Promise<BranchItem> {
    try {
      const updatedBranchItem = await this.branchItemModel.findByIdAndUpdate(
        id,
        updateBranchItemDto,
        { new: true } // Return the updated document
      );
      if (!updatedBranchItem) {
        throw new BadRequestException(`Branch item with ID ${id} not found`);
      }
      return updatedBranchItem;
    } catch (error) {
      throw new BadRequestException(`Failed to update branch item: ${error.message}`);
    }
  }

  async remove(id: string): Promise<BranchItem> {
    try {
      const deletedBranchItem = await this.branchItemModel.findByIdAndDelete(id);
      if (!deletedBranchItem) {
        throw new BadRequestException(`Branch item with ID ${id} not found`);
      }
      return deletedBranchItem;
    } catch (error) {
      throw new BadRequestException(`Failed to delete branch item: ${error.message}`);
    }
  }

  async findByQuery(productId: string, branchId: string): Promise<BranchItem[]> {
    try {
      const query: any = {};

      if (productId) {
        query.item = productId;
      }

      if (branchId) {
        query.branch = branchId;
      }

      const batches = await this.branchItemModel
        .find(query).populate('branch').populate('item').populate({
          path: 'batch',
          model: 'Batch'})
        .exec();

      return batches;
    } catch (error) {
      throw new BadRequestException(`Failed to find batches: ${error.message}`);
    }
  }
}
