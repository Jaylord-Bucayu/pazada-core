import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }

  @Get('get/dailyRevenue')
  getRevenueInRange(@Query('start') start: any, @Query('end') end: any) {
    return this.salesService.getRevenue(start, end);
  }

  @Get('get/dailyOrders')
  getOrdersInRange(@Query('start') start: any, @Query('end') end: any) {
    return this.salesService.getOrders(start, end);
  }

  @Get('get/customerPurchases')
  getCustomerPurchased(@Query('customerId') id: string) {
    return this.salesService.getCustomerPurchased(id);
  }

  @Get('get/customerAllPurchases')
  getAllCustomerPurchased() {
    return this.salesService.getAllCustomerPurchases();
  }
}
