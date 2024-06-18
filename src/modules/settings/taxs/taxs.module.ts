import { Module } from '@nestjs/common';
import { TaxsService } from './taxs.service';
import { TaxsController } from './taxs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tax, TaxSchema } from './entities/tax.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tax.name, schema: TaxSchema }])],
  controllers: [TaxsController],
  providers: [TaxsService],
})
export class TaxsModule {}
