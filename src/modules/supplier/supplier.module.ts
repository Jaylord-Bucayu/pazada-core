import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from './entities/supplier.entity';
import { Address, AddressSchema } from '../address/entities/address.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: Supplier.name, schema: SupplierSchema },
    { name: Address.name, schema: AddressSchema }
  ])],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
