import { Module } from '@nestjs/common';
import { DebitsService } from './debits.service';
import { DebitsController } from './debits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Debit, DebitSchema } from './entities/debit.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Debit.name, schema: DebitSchema }]),
  ],
  controllers: [DebitsController],
  providers: [DebitsService],
})
export class DebitsModule {}
