import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HistoryEntity } from './entities/history.entity';

@Controller('history')
@ApiTags('History')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  @ApiCreatedResponse({type: HistoryEntity})
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @Get()
  @ApiOkResponse({type: HistoryEntity, isArray:true})
  findAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: HistoryEntity})
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: HistoryEntity})
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(+id, updateHistoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: HistoryEntity})
  remove(@Param('id') id: string) {
    return this.historyService.remove(+id);
  }
}
