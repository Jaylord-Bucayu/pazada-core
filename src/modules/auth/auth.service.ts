import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValidateteUserDto } from '../users/dto/validate-user.dto';
import { LoginDto } from './dto/login.dto';

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

 // Login method with validation
 async login(loginDto: LoginDto) {
  const { email, password } = loginDto;

  // Find user by email
  const user = await this.usersService.findOneEmail(email);
  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }

  // Check if the provided password matches the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid email or password');
  }

  // Prepare the JWT payload
  const payload = { email: user.email, sub: user._id, role: user.role };

  // Generate access token
  const accessToken = this.jwtService.sign(payload);

  // Remove the password from the response for security
  const { password: _, ...userWithoutPassword } = user.toObject();

  // Return the token and user information
  return {
      user: userWithoutPassword,
      access_token: accessToken,
  };
}

  async register(user: RegisterDto) {
    // Check if the email already exists
    await this.usersService.findOneEmail(user.email);

    // Hash the user's password
    const saltRounds = 10; // The salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    // Create a new user with the hashed password
    const newUser = await this.userModel.create({
      ...user,
      password: hashedPassword,
    });

    // Remove the password from the response for security
    const { password, ...userWithoutPassword } = newUser.toObject();

    return { data: userWithoutPassword };
  }
}
