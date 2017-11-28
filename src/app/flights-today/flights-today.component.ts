import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Flight } from '../models/flight';
import { FlightsService } from '../services/flights.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-flights-today',
  templateUrl: './flights-today.component.html',
  styleUrls: ['./flights-today.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlightsTodayComponent implements OnInit {

  constructor(private flightsService: FlightsService) { }
  todaysFlights: Flight[];


  // ngOnInit() {
  //   const sec = 10;
  //   Observable.timer(0, sec * 1000).subscribe(this.getWhatsUp());
  // }

  // getTodaysFlights() {
  //   this.flightsService.getTodaysFlights()
  //     .subscribe(flights => this.todaysFlights = flights,
  //                 err => console.log(err));
  // }


  // ngOnInit() {
  //   this.flightsService.getTodaysFlights()
  //   .subscribe(flights => this.todaysFlights = flights,
  //               err => console.log(err));
  // }
  interval: any;

  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => {
        this.refreshData();
    }, 10000);
  }

  refreshData() {
      this.flightsService.getTodaysFlights()
          .subscribe(data => {
              this.todaysFlights = data;
          });
    }

  }
