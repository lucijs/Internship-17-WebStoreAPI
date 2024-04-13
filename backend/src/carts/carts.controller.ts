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

@Controller('carts')
@UseGuards(UserAuthGuard)
@ApiBearerAuth()
@ApiTags('Carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: CartEntity })
  create(@Body() createCartDto: CreateCartDto, @Req() { user }) {
    return this.cartsService.create({ ...createCartDto, userId: user.id });
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: CartEntity, isArray: true })
  findAll() {
    return this.cartsService.findAll();
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: CartEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.findOne(id);
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: CartEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartsService.update(id, updateCartDto);
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: CartEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.remove(id);
  }
}