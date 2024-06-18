import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BatchService } from './batch.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { Batch } from './entities/batch.entity';
import { CreateBatchTransferDTO } from './dto/create-batch-transfer.dto';

@Controller('inventory/batch')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post()
  create(@Body() createBatchDto: CreateBatchDto) {
    return this.batchService.create(createBatchDto);
  }

  @Get()
  findAll() {
    return this.batchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.batchService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBatchDto: UpdateBatchDto) {
    return this.batchService.update(id, updateBatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.batchService.remove(id);
  }

  @Get('get/byProductAndBranch')
  async findByProductAndBranch(@Query('productId') productId: string, @Query('branchId') branchId: string): Promise<Batch[]> {
    return this.batchService.findByProductAndBranch(productId, branchId);
  }


  @Post('transfer')
  async createTransfer(@Body() createBatchTransferDTO:CreateBatchTransferDTO): Promise<Batch> {
    return this.batchService.transferItems(createBatchTransferDTO);
  }
}
