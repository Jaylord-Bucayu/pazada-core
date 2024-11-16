import { Module } from '@nestjs/common';
import { NfcManagerService } from './nfc-manager.service';
import { NfcManagerController } from './nfc-manager.controller';

@Module({
  controllers: [NfcManagerController],
  providers: [NfcManagerService],
})
export class NfcManagerModule {}
