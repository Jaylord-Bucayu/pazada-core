import { Module } from '@nestjs/common';
import { CardAccountService } from './card-account.service';
import { CardAccountController } from './card-account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CardAccount,CardAccountSchema } from './entities/card-account.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: CardAccount.name, schema: CardAccountSchema }])],
  controllers: [CardAccountController],
  providers: [CardAccountService],
})
export class CardAccountModule {}
