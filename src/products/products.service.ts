import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService){}

  create(createProductDto: CreateProductDto) {
    const decimalPrice = new Decimal(createProductDto.price);
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        price: decimalPrice,
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id:number ) {
    return this.prisma.product.findUnique({where:{id:id}});
  }

  findByName(title: string) {
    return this.prisma.product.findMany({where:{title}});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const decimalPrice = new Decimal(updateProductDto.price);
    return this.prisma.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        price: decimalPrice,
      },
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({where:{id}});
  }
}
