import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stage3-d1',
  templateUrl: './stage3-d1.component.html',
  styleUrls: ['./stage3-d1.component.scss']
})
export class Stage3D1Component implements OnInit, OnDestroy {

  date: string;
  selectedDay = 'd1';
  data = [];
  env = 'STG3';
  interval: any;
  constructor(private flightsService: FlightsService) {
    this.date = moment(new Date())
    .add(0, 'days')
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
    this.flightsService.getStg3d1().subscribe(data => {
      this.data = data;
    });
  }
  ngOnDestroy() {
    clearInterval(this.interval);
    this.data =  null;
  }
}
