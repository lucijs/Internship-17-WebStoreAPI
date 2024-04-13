import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryEntity } from './entities/category.entity';
import { AdminAuthGuard } from 'src/users/admin-auth.guard';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: CategoryEntity })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesService.create(createCategoryDto);
    if (!category) {
      throw new NotAcceptableException("Category couldn't be added.");
    }
    return category;
  }

  @Get()
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  async findAll() {
    const categories = await this.categoriesService.findAll();
    if (!categories) {
      throw new NotFoundException("Categories don't exist.");
    }
    return categories;
  }

  @Get(':id')
  @ApiOkResponse({ type: CategoryEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoriesService.findOne(id);
    if (!category) {
      throw new NotFoundException("This category doesn't exist");
    }
    return category;
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: CategoryEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const deletedHistory = await this.categoriesService.update(
        id,
        updateCategoryDto,
      );
      return deletedHistory;
    } catch {
      throw new NotFoundException("The category wasn't updated.");
    }
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: CategoryEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedHistory = await this.categoriesService.remove(id);
      return deletedHistory;
    } catch {
      throw new NotFoundException("The category wasn't deleted.");
    }
  }
}
