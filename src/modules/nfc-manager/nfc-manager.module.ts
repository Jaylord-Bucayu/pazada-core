import { Module } from '@nestjs/common';
import { NfcManagerService } from './nfc-manager.service';
import { NfcManagerController } from './nfc-manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CardAccount, CardAccountSchema } from '../card-account/entities/card-account.entity';
import { TransactionHistoryModule } from '../transaction-history/transaction-history.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: CardAccount.name, schema: CardAccountSchema }])
    , TransactionHistoryModule
  ],
  controllers: [NfcManagerController],
  providers: [NfcManagerService],
})
export class NfcManagerModule { }
