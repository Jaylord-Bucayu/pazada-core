import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Branch } from './entities/branch.entity';
import { Model } from 'mongoose';

@Injectable()
export class BranchService {
  constructor(@InjectModel(Branch.name) private branchModel: Model<Branch>) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const createdBranch = new this.branchModel(createBranchDto);
    return createdBranch.save();
  }

  async findAll(): Promise<Branch[]> {
    return this.branchModel.find().populate('address').exec();
  }

  async findOne(id: string): Promise<Branch> {
    return this.branchModel.findById(id).populate('address').exec();
  }

  async update(id: string, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    return this.branchModel.findByIdAndUpdate(id, updateBranchDto, { new: true }).populate('address').exec();
  }

  async remove(id: string): Promise<Branch> {
    return this.branchModel.findByIdAndDelete(id).exec();
  }


  
}
