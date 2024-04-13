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
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HistoryEntity } from './entities/history.entity';
import { UserAuthGuard } from 'src/users/user-auth.guard';
import { AdminAuthGuard } from 'src/users/admin-auth.guard';

@Controller('history')
@ApiTags('History')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: HistoryEntity })
  async create(@Req() { user }, @Body() createHistoryDto: CreateHistoryDto) {
    const history = await this.historyService.create({
      ...createHistoryDto,
      userId: user.id,
    });
    if (!history) {
      throw new NotAcceptableException("History couldn't be created.");
    }
    return history;
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: HistoryEntity, isArray: true })
  async findAll() {
    const histories = await this.historyService.findAll();
    if (!histories) {
      throw new NotFoundException("History doesn't exist");
    }
    return histories;
  }

  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: HistoryEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const history = await this.historyService.findOne(id);
    if (!history) {
      throw new NotFoundException("History doesn't exist.");
    }
    return history;
  }

  //jel se ovo ikad koristi???
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: HistoryEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHistoryDto: UpdateHistoryDto,
  ) {
    return this.historyService.update(id, updateHistoryDto);
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: HistoryEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedHistory = await this.historyService.remove(id);
      return deletedHistory;
    } catch {
      throw new NotFoundException("The history wasn't deleted.");
    }
  }
}
