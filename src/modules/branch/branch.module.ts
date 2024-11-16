import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Branch, BranchSchema } from './entities/branch.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: Branch.name, schema: BranchSchema }])],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}