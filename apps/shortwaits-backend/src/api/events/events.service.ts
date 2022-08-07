import { Injectable } from '@nestjs/common';
import { CreateEventsDto } from './dto/create-events.dto';
import { UpdateEventsDto } from './dto/update-events.dto';

@Injectable()
export class EventsService {
  create(createEventsDto: CreateEventsDto) {
    return 'This action adds a new reservation';
  }

  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateEventsDto: UpdateEventsDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
