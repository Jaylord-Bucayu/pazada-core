import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { AbilityModule } from '../ability/ability.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from '../departments/entities/department.entity';


@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },  { name: Department.name, schema: DepartmentSchema },]),
    AbilityModule,

  ],
  providers: [UsersService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
