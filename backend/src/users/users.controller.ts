import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() { username, password, email, firstName, lastName, cityAdress, streetAdress, numberAdress, phone}: RegisterDto) {
    return this.usersService.register(username, password, email, firstName, lastName, cityAdress, streetAdress, numberAdress, phone);
  }

  @Post('login')
  login(@Body() { username, password }: LoginDto) {
    return this.usersService.login(username, password);
  }

  @Post()
  @ApiCreatedResponse({type: UserEntity})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({type: UserEntity, isArray:true})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: UserEntity})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: UserEntity})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: UserEntity})
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}