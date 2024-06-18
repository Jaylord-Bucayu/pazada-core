import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema },{ name: Product.name, schema: Product }])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
