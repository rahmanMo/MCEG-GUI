import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventRow } from '../models/event-row';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  allEvents: EventRow[];

  constructor(public eventService: EventService) {

  }

  // fix flight num if its 3 digit or less
  fixFlightNum(flight_number) {
    if (flight_number.length === 1) {
      flight_number = '000' + flight_number;
    } else if (flight_number.length === 2) {
      flight_number = '00' + flight_number;
    } else if (flight_number.length === 3) {
      flight_number = '0' + flight_number;
    }

    return flight_number;
  }
  // fix time if its 3 digit or less
  fixTime(time) {
    if (time.length === 1) {
      time = '000' + time;
    } else if (time.length === 2) {
      time = '00' + time;
    } else if (time.length === 3) {
      time = '0' + time;
    }

    return time;
  }
  // fix uppercase issue
  fixUppercase(value) {
    return value.toUpperCase();
  }


  addEvent(object: EventRow) {
    object.flight_number = this.fixFlightNum(object.flight_number);
    object.actual_out_time_utc = this.fixTime(object.actual_out_time_utc);
    object.actual_off_time_utc = this.fixTime(object.actual_off_time_utc);
    object.actual_on_time_utc = this.fixTime(object.actual_on_time_utc);
    object.actual_in_time_utc = this.fixTime(object.actual_in_time_utc);
    object.actual_eta_time_utc = this.fixTime(object.actual_eta_time_utc);
    object.actual_etd_time_utc = this.fixTime(object.actual_etd_time_utc);
    object.actual_eto_time_utc = this.fixTime(object.actual_eto_time_utc);
    object.actual_eon_time_utc = this.fixTime(object.actual_eon_time_utc);
    object.arrival_gate = this.fixUppercase(object.arrival_gate);
    object.departure_gate = this.fixUppercase(object.departure_gate);
    object.diversion_city = this.fixUppercase(object.diversion_city);
    // console.log(object.flight_number);
    this.eventService.addEvent(object);
    // console.log(this.allEvents);

  }

  ngOnInit() {
  }

}
