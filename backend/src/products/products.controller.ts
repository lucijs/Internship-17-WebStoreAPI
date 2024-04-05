import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { AdminAuthGuard } from 'src/users/admin-auth.guard';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AdminAuthGuard)
  @Post()
  @ApiCreatedResponse({type: ProductEntity})
  create( @Req() {user}, @Body() createProductDto: CreateProductDto) {
    console.log('User from products controller post',user);
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({type: ProductEntity, isArray:true})
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: ProductEntity})
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('byName/:title')
  @ApiOkResponse({type: ProductEntity})
  findByName(@Param('title') title: string) {
    return this.productsService.findByName(title);
  }

  @UseGuards(AdminAuthGuard)
  @Patch(':id')
  @ApiOkResponse({type: ProductEntity})
  update(@Req() {user}, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    console.log('User from products controller patch',user);
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  @ApiOkResponse({type: ProductEntity})
  remove(@Req() {user}, @Param('id') id: string) {
    console.log('User from products controller delete',user);
    return this.productsService.remove(+id);
  }
}