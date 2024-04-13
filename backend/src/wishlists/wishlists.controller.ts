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
  HttpException,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WishlistEntity } from './entities/wishlist.entity';
import { UserAuthGuard } from 'src/users/user-auth.guard';
import { AdminAuthGuard } from 'src/users/admin-auth.guard';

@Controller('wishlists')
@ApiTags('Wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: WishlistEntity })
  async create(@Body() createWishlistDto: CreateWishlistDto, @Req() { user }) {
    try {
      const wishlist = await this.wishlistsService.create({
        ...createWishlistDto,
        userId: user.id,
      });
      return wishlist;
    } catch {
      throw new NotAcceptableException(
        'Check your input once more, you might be sending wrong ids',
      );
    }
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: WishlistEntity, isArray: true })
  async findAll() {
    const wishlisted = await this.wishlistsService.findAll();
    if (!wishlisted) {
      throw new NotFoundException('No products are wishlisted');
    }
    return wishlisted;
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: WishlistEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const wishlist = await this.wishlistsService.findOne(id);
    if (!wishlist) {
      throw new NotFoundException(`There is no wishlist with this ${id} id.`);
    }
  }

  //hoće li se ikad uopće koristit??
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: WishlistEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.update(id, updateWishlistDto);
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: WishlistEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const deleted = await this.wishlistsService.remove(id);
      return deleted;
    } catch {
      throw new NotFoundException("The wishlist wasn't deleted.");
    }
  }
}
