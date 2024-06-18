import { Module } from '@nestjs/common';
import { BranchItemsService } from './branch-items.service';
import { BranchItemsController } from './branch-items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchItem, BranchItemSchema } from './entities/branch-item.entity';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: BranchItem.name, schema: BranchItemSchema }])],
  controllers: [BranchItemsController],
  providers: [BranchItemsService],
})
export class BranchItemsModule {}
