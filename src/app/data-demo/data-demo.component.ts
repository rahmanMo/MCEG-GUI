import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import { ConfigService } from '../services/config-service';
import { sampleData } from '../../assets/data';
import { PapaParseService } from 'ngx-papaparse';
import * as moment from 'moment';

@Component({
  selector: 'app-data-demo',
  templateUrl: './data-demo.component.html',
  styleUrls: ['./data-demo.component.scss'],
  providers: [ConfigService],
  encapsulation: ViewEncapsulation.Emulated
})
export class DataDemoComponent implements OnInit {
  date: string;
  selectedDay: string;
  data = [];
  env = 'STG1';

  constructor(
    private flightsService: FlightsService,
    private papa: PapaParseService
  ) {
    this.date = moment(new Date())
      .format('DD-MMMM-YYYY')
      .toString()
      .toUpperCase();
    this.data = sampleData;
    this.selectedDay = 'd0';
  }

  ngOnInit() {
  }

}
