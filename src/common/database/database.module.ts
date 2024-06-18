import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('DB_HOST')}:${configService.get('DB_PORT')}/${configService.get('DB_DATABASE')}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoLoadEntities: true, // Assuming you want to auto-load entities
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
