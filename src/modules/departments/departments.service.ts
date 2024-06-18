import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  private readonly logger = new Logger(DepartmentsService.name);

  constructor(
    @InjectModel(Department.name) private readonly departmentModel: Model<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = new this.departmentModel(createDepartmentDto);
    return department.save();
  }

  async findAll(): Promise<Department[]> {
    return this.departmentModel.find().populate('employees').exec();
  }

  async findOne(id: string): Promise<Department> {
    return this.departmentModel.findById(new Types.ObjectId(id)).populate('employees').exec();
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    await this.departmentModel.findByIdAndUpdate(new Types.ObjectId(id), updateDepartmentDto, { new: true }).exec();
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.departmentModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
  }
}
