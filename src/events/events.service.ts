
import { Injectable, NotFoundException } from '@nestjs/common';

import type { Event, Session } from './events.type.js';
import type { CreateEventDto } from './dto/create-event.dto.js';
import type { EventQueryDto } from './dto/event-query.dto.js';

@Injectable()
export class EventsService {

  private events: Event[] = [
    {
      id: 1,
      title: 'Technology',
      description: 'Technology events which every talented guy will participate on freely',
      location: 'Addis Ababa',
      eventDate: '2027-10-12',
      category: 'Technology',
      isPublished: false,
    },
    {
      id: 2,
      title: 'Science and Technology',
      description: 'Science and Technology events which every talented guy will participate on freely',
      location: 'Mexico',
      eventDate: '2026-12-12',
      category: 'Science and Technology',
      isPublished: true,
    },
    {
      id: 3,
      title: 'Shopping',
      description: '11th Shopping of books',
      location: 'Addis Ababa University',
      eventDate: '2026-11-12',
      category: 'Shopping',
      isPublished: true,
    },
    {
      id: 4,
      title: 'Welcoming for new students',
      description: 'Very hot and pleasant welcoming program for fresh students',
      location: 'IBT',
      eventDate: '2026-11-30',
      category: 'welcoming',
      isPublished: false,
    },
    {
      id: 5,
      title: '30 years of anniversary',
      description: '30th anniversary of our incredible journey',
      location: 'Addis Ababa Science and Technology',
      eventDate: '2027-10-12',
      category: 'celebration',
      isPublished: true,
    },
  ];

  private sessions: Session[] = [
    {
      id: 1,
      eventId: 1,
      title: 'Technology keynote',
      startAt: '2026-12-10T09:00:00',
      endAt: '2026-12-10T12:00:00',
      room: '00 hall',
    },
    {
      id: 2,
      eventId: 1,
      title: 'Event keynote',
      startAt: '2026-12-21T09:00:00',
      endAt: '2026-12-21T12:00:00',
      room: '003 hall',
    },
    {
      id: 3,
      eventId: 2,
      title: 'Welcoming keynote',
      startAt: '2026-11-20T09:00:00',
      endAt: '2026-11-20T12:00:00',
      room: '005 hall',
    },
    {
      id: 4,
      eventId: 2,
      title: 'Science and technology keynote',
      startAt: '2027-01-10T09:00:00',
      endAt: '2027-01-10T12:00:00',
      room: 'Science hall',
    },
  ];

  
  findAll(query: EventQueryDto): Event[] {
    const {
      category,
      location,
      isPublished,
      sortBy,
      order = 'asc',
      page = 1,
      limit = 5,
    } = query;

    
    const filteredEvents = this.events.filter((event) => {
      const matchesCategory =
        !category ||
        event.category.toLowerCase().includes(category.toLowerCase());

      const matchesLocation =
        !location ||
        event.location.toLowerCase().includes(location.toLowerCase());

      const matchesPublished =
        isPublished === undefined ||
        event.isPublished === isPublished;

      return (
        matchesCategory &&
        matchesLocation &&
        matchesPublished
      );
    });

 
    const sortedEvents = [...filteredEvents];

    if (sortBy) {
      sortedEvents.sort((a, b) => {
        const comparison =
          sortBy === 'title'
            ? a.title.localeCompare(b.title)
            : a.eventDate.localeCompare(b.eventDate);

        return order === 'desc' ? -comparison : comparison;
      });
    }

   
    const offset = (page - 1) * limit;
    const start = offset;
    const end = start + limit;

    const items = sortedEvents.slice(start, end);

    return items;
  }

  findUpcoming(): Event[] {
    const today = new Date();
    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
    ].join('-');

    return this.events.filter(
      (event) => event.eventDate >= todayString,
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
