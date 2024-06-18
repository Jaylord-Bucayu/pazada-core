import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LocationItemsService } from './location-items.service';
import { CreateLocationItemDto } from './dto/create-location-item.dto';
import { UpdateLocationItemDto } from './dto/update-location-item.dto';
import { LocationItem } from './entities/location-item.entity';

@Controller('location-items')
export class LocationItemsController {
  constructor(private readonly locationItemsService: LocationItemsService) {}

  @Post()
  create(@Body() createLocationItemDto: CreateLocationItemDto) {
    return this.locationItemsService.create(createLocationItemDto);
  }

  @Get()
  findAll() {
    return this.locationItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationItemDto: UpdateLocationItemDto) {
    return this.locationItemsService.update(+id, updateLocationItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationItemsService.remove(+id);
  }

  @Get('get/query')
  async findByProductAndLocation(@Query('productId') productId: string, @Query('locationId') locationId: string): Promise<LocationItem[]> {
    return this.locationItemsService.findByQuery(productId, locationId);
  }
}
