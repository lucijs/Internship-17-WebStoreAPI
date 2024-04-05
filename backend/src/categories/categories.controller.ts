import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryEntity } from './entities/category.entity';
import { AdminAuthGuard } from 'src/users/admin-auth.guard';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AdminAuthGuard)
  @Post()
  @ApiCreatedResponse({type: CategoryEntity})
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({type: CategoryEntity, isArray:true})
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: CategoryEntity})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @UseGuards(AdminAuthGuard)
  @Patch(':id')
  @ApiOkResponse({type: CategoryEntity})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  @ApiOkResponse({type: CategoryEntity})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}