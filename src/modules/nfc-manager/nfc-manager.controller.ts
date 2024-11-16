import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NfcManagerService } from './nfc-manager.service';
import { CreateNfcManagerDto } from './dto/create-nfc-manager.dto';
import { UpdateNfcManagerDto } from './dto/update-nfc-manager.dto';

@Controller('nfc-manager')
export class NfcManagerController {
  constructor(private readonly nfcManagerService: NfcManagerService) {}

  @Post()
  create(@Body() createNfcManagerDto: CreateNfcManagerDto) {
    return this.nfcManagerService.create(createNfcManagerDto);
  }

  @Get()
  findAll() {
    return this.nfcManagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nfcManagerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNfcManagerDto: UpdateNfcManagerDto) {
    return this.nfcManagerService.update(+id, updateNfcManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nfcManagerService.remove(+id);
  }
}
