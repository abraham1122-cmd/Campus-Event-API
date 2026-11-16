
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  ParseIntPipe,
  
} from '@nestjs/common';

import { EventsService } from './events.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { EventQueryDto } from './dto/event-query.dto.js';
import { UseGuards } from '@nestjs/common';
import { roleGaurds } from '../auth/auth.guard.js';




@UseGuards(roleGaurds)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  
  @Get()
  findAll(@Query() query: EventQueryDto
          ) {
            
    return this.eventsService.findAll(query);
  }
  
  @Get('upcoming')
  findUpcoming() {
    return this.eventsService.findUpcoming();
  }


  // @Get()
  // findAll(@Req() req: Request){
  //   console.log(req["user"])

  //   return this.eventsService.findAll()


  

  // GET /api/events/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  // GET /api/events/:id/sessions
  @Get(':id/sessions')
  findSessions(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findSessions(id);
  }

  // GET /api/events/:id/sessions/:sessionId
  @Get(':id/sessions/:sessionId')
  findOneSession(
    @Param('id', ParseIntPipe) id: number,
    @Param('sessionId', ParseIntPipe) sessionId: number,
  ) {
    return this.eventsService.findOneSession(id, sessionId);
  }

  // POST /api/events
  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }
}
