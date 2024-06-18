import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const categoryId = createProductDto.category;

    // Check if the category exists
    const category = await this.categoryModel.findById(categoryId).exec();
    if (!category) {
      throw new BadRequestException('Category does not exist.');
    }

    const product = await this.productModel.create({ 
      ...createProductDto, 
      category: category._id,
    });

    this.logger.log(`Creating product with category: ${category._id}`); // Log category before saving
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('category').exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).populate('category').exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const categoryId = updateProductDto.category;

    this.logger
    .log(updateProductDto);

    if (categoryId) {
      const category = await this.categoryModel.findById(categoryId).exec();
      if (!category) {
        throw new BadRequestException('Category does not exist.');
      }
      updateProductDto.category = category._id.toString();

    }

    await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).populate('category').exec();
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }
}
