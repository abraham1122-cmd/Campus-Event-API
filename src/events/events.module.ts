



import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { EventsController } from './events.controller.js';
import { EventsService } from './events.service.js';
import { LoggerMiddleware } from '../middleware/middleware.logger.js';

@Module({
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    
    consumer.apply(LoggerMiddleware).forRoutes("events");
  }
}
