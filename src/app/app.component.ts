import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  day1: string;
  day2: string;
  day3: string;

  ngOnInit() {
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
  }

}
