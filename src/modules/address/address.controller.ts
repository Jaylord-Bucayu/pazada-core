import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
      return this.addressService.create(createAddressDto);
  }

  @Get()
  async findAll(): Promise<Address[]> {
      return this.addressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Address> {
      return this.addressService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto): Promise<Address> {
      return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Address> {
      return this.addressService.remove(id);
  }
}
