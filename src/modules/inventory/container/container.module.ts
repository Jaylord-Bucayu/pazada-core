import { Module } from '@nestjs/common';
import { ContainerService } from './container.service';
import { ContainerController } from './container.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Container, ContainerSchema } from './entities/container.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: Container.name, schema: ContainerSchema }])],
  controllers: [ContainerController],
  providers: [ContainerService],
})
export class ContainerModule {}