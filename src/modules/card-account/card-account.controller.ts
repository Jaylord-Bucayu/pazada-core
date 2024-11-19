import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardAccountService } from './card-account.service';
import { CreateCardAccountDto } from './dto/create-card-account.dto';
import { UpdateCardAccountDto } from './dto/update-card-account.dto';

@Controller('card-account')
export class CardAccountController {
  constructor(private readonly cardAccountService: CardAccountService) {}

  @Post()
  create(@Body() createCardAccountDto: CreateCardAccountDto) {
    return this.cardAccountService.create(createCardAccountDto);
  }

  @Get()
  findAll() {
    return this.cardAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {  // Use string instead of number
    return this.cardAccountService.findOne(id);  // Pass the id as a string
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardAccountDto: UpdateCardAccountDto) {
    return this.cardAccountService.update(id, updateCardAccountDto);  // Pass the id as a string
  }

  @Delete(':id')
  remove(@Param('id') id: string) {  // Use string instead of number
    return this.cardAccountService.remove(id);  // Pass the id as a string
  }
}
