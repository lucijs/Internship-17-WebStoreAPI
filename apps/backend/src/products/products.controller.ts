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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { AdminAuthGuard } from 'src/users/admin-auth.guard';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    if (!product) {
      throw new NotAcceptableException('Check your input.');
    }
    return product;
  }

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findAll() {
    const products = await this.productsService.findAll();
    if (!products) {
      throw new NotFoundException("Products don't exist");
    }
    return products;
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException("Product doesn't exist");
    }
    return product;
  }

  @Get('byName/:title')
  @ApiOkResponse({ type: ProductEntity })
  async findByName(@Param('title') title: string) {
    const product = await this.productsService.findByName(title);
    if (!product) {
      throw new NotFoundException("Product doesn't exist");
    }
    return product;
  }

  @Get('categories/:title')
  @ApiOkResponse({ type: ProductEntity })
  async findByCategory(@Param('category') category: number) {
    const product = await this.productsService.findByCategory(category);
    if (!product) {
      throw new NotFoundException("Product doesn't exist");
    }
    return product;
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: ProductEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const updatedUser = await this.productsService.update(
        id,
        updateProductDto,
      );
      return updatedUser;
    } catch {
      throw new NotFoundException("Product couldn't be updated.");
    }
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: ProductEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const updatedUser = await this.productsService.remove(id);
      return updatedUser;
    } catch {
      throw new NotFoundException("Product couldn't be deleted.");
    }
  }
}
