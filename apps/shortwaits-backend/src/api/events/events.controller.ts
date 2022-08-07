import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventsDto } from './dto/create-events.dto';
import { UpdateEventsDto } from './dto/update-events.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AtGuard } from '../../common/guards';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';

@UseGuards(AtGuard)
@ApiTags('events')
@ApiBearerAuth('bearer')
@UseInterceptors(TransformInterceptor)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventsDto: CreateEventsDto) {
    return this.eventsService.create(createEventsDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventsDto: UpdateEventsDto) {
    return this.eventsService.update(+id, updateEventsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
