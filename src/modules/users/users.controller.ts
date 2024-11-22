import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AbilityFactory, Action } from '../ability/ability.factory';
// import { JwtGuard } from 'src/common/guards/jwt.guard';
// import { User } from './entities/user.entity';
import { Request } from 'express';
import { User } from './entities/user.entity';
// import { AbilitiesGuard } from 'src/common/guards/abilities.guard';
// import { CheckAbilities } from 'src/common/decorators/ability.decorator';




@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private abilityFactory : AbilityFactory) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }



  // @UseGuards(JwtGuard,AbilitiesGuard)
  // @CheckAbilities({action: Action.Read, subject: User})
  @Get()
  findAll(@Query('role') role?: string): Promise<User[]> {
    return this.usersService.findAll(role);
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  // @UseGuards(AbilitiesGuard)
  // @CheckAbilities({action: Action.Delete, subject: User})
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch('complete-profile/:email')
  async completeProfileByEmail(
    @Param('email') email: string,
    @Body() updateProfileDto: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.completeProfileByEmail(email, updateProfileDto);
    return { data: updatedUser, message: 'Profile updated successfully' };
  }

}
