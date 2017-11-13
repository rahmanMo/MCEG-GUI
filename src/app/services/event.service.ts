import { Injectable } from '@angular/core';
import { EventRow } from '../models/event-row';

@Injectable()
export class EventService {

  constructor() { }
  allEvents: EventRow[] = [];

  // get events from local array
  getEvents() {
    return this.allEvents;
  }

  // add event to local storage
  addEvent(eventRow: EventRow) {
    this.allEvents.push(eventRow);
    return this.allEvents;
  }

  // remove individual event from local storage
  removeEvent(eventRow: EventRow) {
    for (let index = 0; index < this.allEvents.length; index++) {
      if (eventRow === this.allEvents[index]) {
        this.allEvents.splice(index, 1);
      }

    }

    return this.allEvents;
  }

}
