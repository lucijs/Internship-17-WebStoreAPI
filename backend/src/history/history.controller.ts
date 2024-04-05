import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HistoryEntity } from './entities/history.entity';
import { UserAuthGuard } from 'src/users/user-auth.guard';
import { AdminAuthGuard } from 'src/users/admin-auth.guard';

@Controller('history')
@ApiTags('History')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  @ApiCreatedResponse({type: HistoryEntity})
  create(@Req() {user},@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create({...createHistoryDto, userId:user.id});
  }

  @UseGuards(AdminAuthGuard)
  @Get()
  @ApiOkResponse({type: HistoryEntity, isArray:true})
  findAll() {
    return this.historyService.findAll();
  }

  @UseGuards(UserAuthGuard)
  @Get(':id')
  @ApiOkResponse({type: HistoryEntity})
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(+id);
  }

  @UseGuards(AdminAuthGuard)
  @Patch(':id')
  @ApiOkResponse({type: HistoryEntity})
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(+id, updateHistoryDto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  @ApiOkResponse({type: HistoryEntity})
  remove(@Param('id') id: string) {
    return this.historyService.remove(+id);
  }
}