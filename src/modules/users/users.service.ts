import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return existingUser;
  }

  async remove(id: string): Promise<void> {
    return await this.userModel.findByIdAndDelete(id);
    
  }

  async findOneEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }


    // Method to complete user profile using email
  async completeProfileByEmail(email: string, updateProfileDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.staged !== 0) {
      throw new BadRequestException('User profile is already completed');
    }

    // Set role to 'merchant' if not provided
    if (!updateProfileDto.role) {
      updateProfileDto.role = 'merchant';
    }

    // Update user profile details and set staged to 1
    Object.assign(user, updateProfileDto);
    user.staged = 1;

    await user.save();

    return user;
  }

}
