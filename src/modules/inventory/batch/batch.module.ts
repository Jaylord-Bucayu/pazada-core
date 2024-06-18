import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { BatchController } from './batch.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Batch, BatchSchema } from './entities/batch.entity';
import { Branch, BranchSchema } from '../../branch/entities/branch.entity';
import { Product, ProductSchema } from '../../products/entities/product.entity';
import { Location, LocationSchema } from '../location/entities/location.entity';
import { LocationItem, LocationItemSchema } from '../location-items/entities/location-item.entity';
import { BranchItem, BranchItemSchema } from '../branch-items/entities/branch-item.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Batch.name, schema: BatchSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: Location.name, schema: LocationSchema },
      { name: LocationItem.name, schema: LocationItemSchema },
      { name: BranchItem.name, schema: BranchItemSchema }
    ]),
   
  ],
  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
