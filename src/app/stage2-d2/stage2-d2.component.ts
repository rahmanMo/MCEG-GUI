import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stage2-d2',
  templateUrl: './stage2-d2.component.html',
  styleUrls: ['./stage2-d2.component.scss']
})
export class Stage2D2Component implements OnInit, OnDestroy {

  date: string;
  selectedDay = 'd2';
  data = [];
  env = 'STG2';
  interval: any;
  constructor(private flightsService: FlightsService) {
    this.date = moment(new Date())
    .add(1, 'days')
    .format('DD-MMMM-YYYY')
    .toString()
    .toUpperCase();
  }
  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 10000);
  }
  refreshData() {
    this.flightsService.getStg2d2().subscribe(data => {
      this.data = data;
    });
  }
  ngOnDestroy() {
    clearInterval(this.interval);
    this.data =  null;
  }
}
