import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaxsService } from './taxs.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { BulkCreateTaxDto } from './dto/create-bulk-tax.dto';

@Controller('taxs')
export class TaxsController {
  constructor(private readonly taxsService: TaxsService) {}

  @Post()
  create(@Body() createTaxDto: CreateTaxDto) {
    return this.taxsService.create(createTaxDto);
  }

  @Get()
  findAll() {
    return this.taxsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaxDto: UpdateTaxDto) {
    return this.taxsService.update(id, updateTaxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxsService.remove(id);
  }

  @Post('/bulk/create')
  async bulkCreate(@Body() bulkCreateTaxDto: BulkCreateTaxDto) {
    return this.taxsService.bulkCreate(bulkCreateTaxDto);
  }
}
