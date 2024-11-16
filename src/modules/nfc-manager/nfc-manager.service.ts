import { Injectable } from '@nestjs/common';
import { CreateNfcManagerDto } from './dto/create-nfc-manager.dto';
import { UpdateNfcManagerDto } from './dto/update-nfc-manager.dto';

@Injectable()
export class NfcManagerService {
  create(createNfcManagerDto: CreateNfcManagerDto) {
    return 'This action adds a new nfcManager';
  }

  findAll() {
    return `This action returns all nfcManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nfcManager`;
  }

  update(id: number, updateNfcManagerDto: UpdateNfcManagerDto) {
    return `This action updates a #${id} nfcManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} nfcManager`;
  }
}
