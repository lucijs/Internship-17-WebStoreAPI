import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CartEntity } from './entities/cart.entity';
import { UserAuthGuard } from 'src/users/user-auth.guard';
import { AdminAuthGuard } from 'src/users/admin-auth.guard';

@Controller('carts')
@UseGuards(UserAuthGuard)
@ApiTags('Carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  @ApiCreatedResponse({type: CartEntity})
  create(@Body() createCartDto: CreateCartDto, @Req() {user}) {
    return this.cartsService.create({...createCartDto,userId: user.id});
  }

  @UseGuards(AdminAuthGuard)
  @Get()
  @ApiOkResponse({type: CartEntity, isArray:true})
  findAll() {
    return this.cartsService.findAll();
  }

  @UseGuards(UserAuthGuard)
  @Get(':id')
  @ApiOkResponse({type: CartEntity})
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @UseGuards(UserAuthGuard)
  @Patch(':id')
  @ApiOkResponse({type: CartEntity})
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @UseGuards(UserAuthGuard)
  @Delete(':id')
  @ApiOkResponse({type: CartEntity})
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}