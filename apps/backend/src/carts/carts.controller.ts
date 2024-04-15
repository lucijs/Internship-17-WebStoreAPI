import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CartEntity } from './entities/cart.entity';
import { UserAuthGuard } from 'src/users/user-auth.guard';
import { AdminAuthGuard } from 'src/users/admin-auth.guard';

@Controller('/carts')
@UseGuards(UserAuthGuard)
@ApiBearerAuth()
@ApiTags('Carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: CartEntity })
  async create(@Body() createCartDto: CreateCartDto, @Req() { user }) {
    const cart = await this.cartsService.create({
      ...createCartDto,
      userId: user.id,
    });
    if (!cart) {
      throw new NotAcceptableException("Cart couldn't be added");
    }
    return cart;
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: CartEntity, isArray: true })
  async findAll() {
    const carts = await this.cartsService.findAll();
    if (!carts) {
      throw new NotFoundException("Carts don't exist.");
    }
    return carts;
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: CartEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const cart = await this.cartsService.findOne(id);
    if (!cart) {
      throw new NotFoundException("Cart doesn't exist");
    }
    return cart;
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: CartEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    try {
      const deletedHistory = await this.cartsService.update(id, updateCartDto);
      return deletedHistory;
    } catch {
      throw new NotFoundException("The cart wasn't updated.");
    }
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: CartEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedHistory = await this.cartsService.remove(id);
      return deletedHistory;
    } catch {
      throw new NotFoundException("The cart wasn't deleted.");
    }
  }
}
