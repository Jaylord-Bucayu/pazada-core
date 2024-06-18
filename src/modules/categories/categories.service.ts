import {  BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto | CreateCategoryDto[]): Promise<Category | Category[]> {
    if (Array.isArray(createCategoryDto)) {
      if (createCategoryDto.length === 0) {
        throw new BadRequestException('Array must contain at least one category.');
      }
      const categoriesWithCodes = createCategoryDto.map(categoryDto => ({
        ...categoryDto,
        code: this.generateCategoryCode(),
      }));
      const createdCategories = await this.categoryModel.create(categoriesWithCodes);
      return createdCategories;
    } else {
      const categoryWithCode = {
        ...createCategoryDto,
        code: this.generateCategoryCode(),
      };
      const createdCategory = await this.categoryModel.create(categoryWithCode);
      return createdCategory;
    }
  }

  private generateCategoryCode(): string {
    return 'CAT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id)
  }
}
