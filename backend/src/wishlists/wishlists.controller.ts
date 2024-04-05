import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WishlistEntity } from './entities/wishlist.entity';
import { UserAuthGuard } from 'src/users/user-auth.guard';
import { AdminAuthGuard } from 'src/users/admin-auth.guard';

@Controller('wishlists')
@ApiTags('Wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  @ApiCreatedResponse({type: WishlistEntity})
  create(@Body() createWishlistDto: CreateWishlistDto, @Req() {user}) {
    return this.wishlistsService.create({...createWishlistDto, userId: user.id});
  }

  @UseGuards(AdminAuthGuard)
  @Get()
  @ApiOkResponse({type: WishlistEntity, isArray:true})
  findAll() {
    return this.wishlistsService.findAll();
  }

  @UseGuards(UserAuthGuard)
  @Get(':id')
  @ApiOkResponse({type: WishlistEntity})
  findOne(@Req() {user}) {
    return this.wishlistsService.findOne(user.id);
  }

  @UseGuards(UserAuthGuard)
  @Patch(':id')
  @ApiOkResponse({type: WishlistEntity})
  update(@Req() {user}, @Body() updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistsService.update(user.id, updateWishlistDto);
  }

  @UseGuards(UserAuthGuard)
  @Delete(':id')
  @ApiOkResponse({type: WishlistEntity})
  remove(@Req() {user}) {
    return this.wishlistsService.remove(user.id);
  }
}