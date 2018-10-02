import { Injectable } from '@angular/core';
import { EventRow } from '../models/event-row';
import { validateConfig } from '@angular/router/src/config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Flight } from '../models/flight';

@Injectable()
export class EventService {

  constructor() { }
  allEvents: EventRow[] = [];
  private env = new BehaviorSubject<any>('');
  currentEnv = this.env.asObservable();
  private selectedFlight = new BehaviorSubject<any>('');
  currentFlight = this.selectedFlight.asObservable();
  // get events from local array
  getEvents() {
    return this.allEvents;
  }
  envChange(value) {
    this.env.next(value);
  }

  flightChange(flight: Flight) {
    this.selectedFlight.next(flight);
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
