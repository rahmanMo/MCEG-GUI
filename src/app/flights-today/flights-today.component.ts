import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Flight } from '../models/flight';
import { FlightsService } from '../services/flights.service';

@Component({
  selector: 'app-flights-today',
  templateUrl: './flights-today.component.html',
  styleUrls: ['./flights-today.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlightsTodayComponent implements OnInit {

  constructor(private flightsService: FlightsService) { }
  todaysFlights: Flight[];

  ngOnInit() {
    this.flightsService.getTodaysFlights()
    .subscribe(flights => this.todaysFlights = flights);
  }

}
