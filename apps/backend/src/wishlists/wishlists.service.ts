import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishlistsService {
  constructor(private prisma: PrismaService){}

  create(createWishlistDto: CreateWishlistDto) {
    return this.prisma.wishlist.create({ data: createWishlistDto });
  }

  findAll(id:number) {
    return this.prisma.wishlist.findMany({where:{userId:id}});
  }

  findOne(id: number) {
    return this.prisma.wishlist.findUnique({where:{id}});
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.prisma.wishlist.update({
      where: { id },
      data: updateWishlistDto
    });
  }
  

  remove(id: number) {
    return this.prisma.wishlist.delete({where:{id}});
  }
}