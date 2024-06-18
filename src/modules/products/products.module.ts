import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Category } from '../categories/entities/category.entity';
// import { Product } from './entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import {
  Category,
  CategorySchema,
} from '../categories/entities/category.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Department, DepartmentSchema } from '../departments/entities/department.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: User },
      { name: Department.name, schema: DepartmentSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, UsersService,JwtService],
})
export class ProductsModule {}
