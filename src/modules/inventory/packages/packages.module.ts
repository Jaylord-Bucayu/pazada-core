import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Container, ContainerSchema } from '../container/entities/container.entity';
import { Product, ProductSchema } from 'src/modules/products/entities/product.entity';
import { Package, PackageSchema } from './entities/package.entity';

@Module({

  imports: [
    MongooseModule.forFeature([
      { name: Container.name, schema: ContainerSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Package.name, schema: PackageSchema },
    ]),
  ],
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
