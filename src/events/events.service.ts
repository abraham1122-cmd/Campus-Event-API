


import { Injectable, NotFoundException } from '@nestjs/common';

import type { Event, Session } from './events.type.js';
import { CreateEventDto } from './dto/create-event.dto.js';

@Injectable()
export class EventsService {

    private events: Event[] = [

        {
            id: 1,
            title: "Technology",
            description: "Technology events which every talented guy will participate on freely",
            location: "Addis Ababa",
            eventDate: "10-12-2027",
            category: "Technology",
            isPublished: false,


        },

       
        {
            id: 2,
            title: "Science and Technology",
            description: "Science and Technology events which every talented guy will participate on freely",
            location: "Mexico",
            eventDate: "12-12-2026",
            category: "Science and Technology",
            isPublished: true,


        },



        
        {
            id: 3,
            title: "Shopping",
            description: "11th Shopping of books ",
            location: "Addis Ababa University",
            eventDate: "11-12-2026",
            category: "Shopping",
            isPublished: true,


        },


        
        {
            id: 4,
            title: "Welcoming for new students",
            description: "very hot and pleasure welcoming program for fresh students",
            location: "IBT",
            eventDate: "11-30-2026",
            category: "welcoming",
            isPublished: false,


        },


        
        {
            id: 5,
            title: "30 years of anversary",
            description: " 30th unversary of our incredible journey",
            location: "Addis Ababa science and Technology",
            eventDate: "10-12-2027",
            category: "celebration",
            isPublished: true,


        },



    ]



    private sessions: Session[] = [

        {
           id: 1,
           eventId: 1,
           title: "technology keynote",
           startAt: "12-10-2026",
           endAt: "12-15-2026",
           room: "00 hall",

        },



          {
           id: 2,
           eventId: 1,
           title: "event keynote",
           startAt: "21-12-2026",
           endAt: "28-12-2026",
           room: "003 hall",

        },



          {
           id: 3,
           eventId: 2,
           title: "welcoming keynote",
           startAt: "11-20-2026",
           endAt: "11-25-2026",
           room: "005 hall",

        },


          {
           id: 4,
           eventId: 2,
           title: "science and teck keynote",
           startAt: "1-10-2027",
           endAt: "1-10-2027",
           room: "science hall",

        },
    ];





    findAll(): Event[] {
    return this.events;
  }

  findUpcoming(): Event[] {
    const today = new Date();
    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
    ].join('-');

    return this.events.filter(
      (event) => event.eventDate.slice(0, 10) >= todayString,
    );
  }

  findOne(id: number): Event {
    const event = this.events.find((event) => event.id === id);

    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }

    return event;
  }

  findSessions(eventId: number): Session[] {
    this.findOne(eventId);

    return this.sessions.filter(
      (session) => session.eventId === eventId,
    );
  }

  findOneSession(eventId: number, sessionId: number): Session {
    this.findOne(eventId);

    const session = this.sessions.find(
      (session) =>
        session.id === sessionId && session.eventId === eventId,
    );

    if (!session) {
      throw new NotFoundException(
        `Session ${sessionId} not found for event ${eventId}`,
      );
    }

    return session;
  }

  create(dto: CreateEventDto): Event {
    const newEvent: Event = {
      id: this.events.length
        ? Math.max(...this.events.map((event) => event.id)) + 1
        : 1,
      ...dto,
    };

    this.events.push(newEvent);

    return newEvent;
  }




}


  