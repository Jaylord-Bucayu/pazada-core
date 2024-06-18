import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from './entities/department.entity';
import { User, UserSchema } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{ name: Department.name, schema: DepartmentSchema },{ name: User.name, schema: UserSchema }])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService,JwtService],
})
export class DepartmentsModule {}
