import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stage1-d3',
  templateUrl: './stage1-d3.component.html',
  styleUrls: ['./stage1-d3.component.scss']
})
export class Stage1D3Component implements OnInit, OnDestroy {

  date: string;
  selectedDay = 'd3';
  data = [];
  env = 'STG1';
  interval: any;
  constructor(private flightsService: FlightsService) {
    this.date = moment(new Date())
    .add(2, 'days')
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
    this.flightsService.getStg1d3().subscribe(data => {
      this.data = data;
    });
  }
  ngOnDestroy() {
    clearInterval(this.interval);
    this.data =  null;
  }
}
