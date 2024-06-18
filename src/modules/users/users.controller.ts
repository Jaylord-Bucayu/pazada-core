import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AbilityFactory, Action } from '../ability/ability.factory';
// import { JwtGuard } from 'src/common/guards/jwt.guard';
// import { User } from './entities/user.entity';
import { Request } from 'express';
// import { AbilitiesGuard } from 'src/common/guards/abilities.guard';
// import { CheckAbilities } from 'src/common/decorators/ability.decorator';




@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private abilityFactory : AbilityFactory) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get()
  // @UseGuards(JwtGuard,AbilitiesGuard)
  // @CheckAbilities({action: Action.Read, subject: User})
  async findAll(@Req() request: Request) {
    console.log(request)
    return this.usersService.findAll();
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
}
