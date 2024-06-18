import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValidateteUserDto } from '../users/dto/validate-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateGoogle(details: ValidateteUserDto) {
    console.log('AuthService');
    console.log(details);
    const user = await this.userModel.findOne({ email: details.email });
    console.log(user);
    if (user) return user;
    console.log('User not found. Creating...');
    const newUser = await this.userModel.create(details);
    return newUser;
  }

  async validateUser(payload: ValidateteUserDto): Promise<any> {
    const user: any = await this.usersService.findOneEmail(payload.email);

    if (user && (await bcrypt.compare(payload.password, user.password))) {
      const { ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
    // TODO: Generate a JWT and return it here
    // instead of the user object
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterDto) {
    await this.usersService.findOneEmail(user.email);

    const newUser = await this.userModel.create(user);
    return { data: newUser };
  }
}
