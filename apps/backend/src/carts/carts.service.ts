import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService){}

  create(createCartDto: CreateCartDto) {
    return this.prisma.cart.create({data: createCartDto});
  }

  findAll() {
    return this.prisma.cart.findMany();
  }

  findOne(id: number) {
    return this.prisma.cart.findUnique({where:{id}});
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return this.prisma.cart.update({where:{id}, data: updateCartDto});
  }

  remove(id: number) {
    return this.prisma.cart.delete({where:{id}});
  }
}