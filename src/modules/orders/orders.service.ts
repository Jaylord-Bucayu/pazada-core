import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const productIds = createOrderDto.products;

    // Fetch the products and calculate the total amount
    const products = await this.productModel.find({ _id: { $in: productIds } }).exec();
    if (products.length !== productIds.length) {
      throw new BadRequestException('Some products do not exist.');
    }

    const totalAmount = products.reduce((sum, product) => sum + product.price, 0);

    const order = new this.orderModel({
      ...createOrderDto,
      totalAmount,
      orderNumber: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    });

    return order.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('products').exec();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).populate('products').exec();
  }

  async update(id: string, updateOrderDto: CreateOrderDto): Promise<Order> {
    const productIds = updateOrderDto.products;

    // Fetch the products and calculate the total amount
    const products = await this.productModel.find({ _id: { $in: productIds } }).exec();
    if (products.length !== productIds.length) {
      throw new BadRequestException('Some products do not exist.');
    }

    const totalAmount = products.reduce((sum, product) => sum + product.price, 0);

    await this.orderModel.findByIdAndUpdate(id, { ...updateOrderDto, totalAmount }, { new: true }).exec();
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.orderModel.findByIdAndDelete(id).exec();
  }
}
