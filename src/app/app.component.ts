import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  day0: string;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
  day6: string;
  day7: string;
  year = moment(new Date()).format('YYYY');

  ngOnInit() {
    this.day0 = moment(new Date())
      .add(-1, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase();
    this.day1 = moment(new Date())
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase();
    this.day2 = moment(new Date())
      .add(1, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase();
    this.day3 = moment(new Date())
      .add(2, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase();
    this.day4 = moment(new Date())
      .add(3, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase();
    this.day5 = moment(new Date())
      .add(4, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase();
    this.day6 = moment(new Date())
      .add(5, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase();
    this.day7 = moment(new Date())
      .add(6, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase();
  }
}
