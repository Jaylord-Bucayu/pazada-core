import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BranchItemsService } from './branch-items.service';
import { CreateBranchItemDto } from './dto/create-branch-item.dto';
import { UpdateBranchItemDto } from './dto/update-branch-item.dto';
import { BranchItem } from './entities/branch-item.entity';

@Controller('branch-items')
export class BranchItemsController {
  constructor(private readonly branchItemsService: BranchItemsService) {}

  @Post()
  create(@Body() createBranchItemDto: CreateBranchItemDto) {
    return this.branchItemsService.create(createBranchItemDto);
  }

  @Get()
  findAll() {
    return this.branchItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchItemsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchItemDto: UpdateBranchItemDto) {
    return this.branchItemsService.update(id, updateBranchItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchItemsService.remove(id);
  }

  @Get('get/query')
  async findByProductAndBranch(@Query('productId') productId: string, @Query('branchId') branchId: string): Promise<BranchItem[]> {
    return this.branchItemsService.findByQuery(productId, branchId);
  }
}
