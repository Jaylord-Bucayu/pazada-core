import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { Actions } from '../../common/decorators/actions.decorator';

@Controller('products')
// @UseGuards(JwtGuard, DepartmentGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Actions('create_product')
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  // @Actions('view_product')
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  // @Actions('view_product')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  // @Actions('update_product')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Actions('delete_product')
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}
