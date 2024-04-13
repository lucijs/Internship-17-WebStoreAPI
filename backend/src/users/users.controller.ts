import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AdminAuthGuard } from './admin-auth.guard';
import { UserAuthGuard } from './user-auth.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiCreatedResponse({ type: UserEntity })
  register(
    @Body()
    {
      username,
      password,
      email,
      firstName,
      lastName,
      cityAdress,
      streetAdress,
      numberAdress,
      phone,
    }: RegisterDto,
  ) {
    return this.usersService.register(
      username,
      password,
      email,
      firstName,
      lastName,
      cityAdress,
      streetAdress,
      numberAdress,
      phone,
    );
  }

  @Post('login')
  @ApiCreatedResponse({ type: UserEntity })
  login(@Body() { username, password }: LoginDto) {
    return this.usersService.login(username, password);
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll(@Req() { user }) {
    console.log('User from users controller findAll', user);
    return this.usersService.findAll();
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Req() { user }) {
    return this.usersService.findOne(user.id);
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  update(@Req() { user }, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Req() { user }) {
    return this.usersService.remove(user.id);
  }
}