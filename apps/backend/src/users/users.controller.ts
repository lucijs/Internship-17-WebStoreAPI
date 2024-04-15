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
  NotFoundException,
  ParseIntPipe,
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
import { NotFoundError } from 'rxjs';

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
  async findAll() {
    const users = await this.usersService.findAll();
    if (!users) {
      throw new NotFoundException('There are no users');
    }
    return users;
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const userId = await this.usersService.findOne(id);
    if (!userId) {
      throw new NotFoundException(`The user with this ${id} doesn't exist.`);
    }
    return userId;
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const updatedUser = await this.usersService.update(id, updateUserDto);
      return updatedUser;
    } catch {
      throw new NotFoundException("The user wasn't updated.");
    }
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedUser = await this.usersService.remove(id);
      return deletedUser;
    } catch {
      throw new NotFoundException("The user wasn't deleted.");
    }
  }
}
