import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stage1-d5',
  templateUrl: './stage1-d5.component.html',
  styleUrls: ['./stage1-d5.component.scss']
})
export class Stage1D5Component implements OnInit, OnDestroy {

  date: string;
  selectedDay = 'd5';
  data = [];
  env = 'STG1';
  interval: any;
  constructor(private flightsService: FlightsService) {
    this.date = moment(new Date())
    .add(4, 'days')
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
    this.flightsService.getStg1d5().subscribe(data => {
      this.data = data;
    });
  }
  ngOnDestroy() {
    clearInterval(this.interval);
    this.data =  null;
  }
}
