import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Flight } from '../models/flight';
import { FlightsService } from '../services/flights.service';
// import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../services/config-service';
import { sampleData } from '../../assets/data';
import * as moment from 'moment';

@Component({
  selector: 'app-stage1-d2',
  templateUrl: './stage1-d2.component.html',
  styleUrls: ['./stage1-d2.component.scss'],
  providers: [ConfigService],
  encapsulation: ViewEncapsulation.None
})
export class Stage1D2Component implements OnInit, OnDestroy {

  basicColumns = [
    { key: 'identifier', title: 'Flight#' },
    { key: 'tailNumber', title: 'Tail#' },
    { key: 'origin', title: 'Origin' },
    { key: 'destination', title: 'Destination' },
    { key: 'STDudt', title: 'STD-UTC' },
    { key: 'STAudt', title: 'STA-UTC' },
    { key: 'numGMTDate', title: 'UTC Date' },
    { key: 'numericFlightDate', title: 'Local Date' }
  ];
  specColumns = [
    { key: 'identifier', title: 'Flight#' },
    { key: 'OAGEquipmentType', title: 'Equipment' },
    { key: 'sequence', title: 'Sequence' },
    { key: 'csvFSDailyID', title: 'DailyID' }
  ];
  miscColumns = [
    { key: 'identifier', title: 'Flight#' },
    { key: 'previousTailNumber', title: 'Prev-Tail' },
    { key: 'tailNumBeforeCancel', title: 'Tail#-Before-Cancel' },
    { key: 'flightStatus', title: 'Status' },
    { key: 'cancelled', title: 'Cancelled?' },
    { key: 'CTFlightNumber', title: 'CT-Flight#' }
  ];
  gateColumns = [
    { key: 'identifier', title: 'Flight#' },
    { key: 'origin', title: 'Origin' },
    { key: 'originGate', title: 'Origin-Gate' },
    { key: 'destination', title: 'Destination' },
    { key: 'destinationGate', title: 'Destination-Gate' }
  ];
  originTimeColumns = [
    { key: 'identifier', title: 'Flight#' },
    { key: 'STDudt', title: 'STD-UTC' },
    { key: 'STDLocal', title: 'STD-Local' },
    { key: 'ETDudt', title: 'ETD-UTC' },
    { key: 'ETDlocal', title: 'ETD-Local' },
    { key: 'OUTudt', title: 'OUT-UTC' },
    { key: 'OFFudt', title: 'OFF-UTC' },
    { key: 'ETOutc', title: 'ETO-UTC' },
    { key: 'STDGMTVariance', title: 'UTC-Offset' }
  ];
  destinationTimeColumns = [
    { key: 'identifier', title: 'Flight#' },
    { key: 'STAudt', title: 'STA-UTC' },
    { key: 'STALocal', title: 'STA-Local' },
    { key: 'ETAudt', title: 'ETA-UTC' },
    { key: 'ETAlocal', title: 'ETA-Local' },
    { key: 'ONudt', title: 'ON-UTC' },
    { key: 'INudt', title: 'IN-UTC' },
    { key: 'EONutc', title: 'EON-UTC' },
    { key: 'STAGMTVariance', title: 'UTC-Offset' }
  ];

  date: string;
  data = [];
  rowData: Flight;
  configuration;
  totalCount: any;

  constructor(private flightsService: FlightsService) {
    this.configuration = ConfigService.config;
    this.date = moment(new Date())
    .add(1, 'days')
    .format('DD MMMM, YYYY')
    .toString()
    .toUpperCase();
  }

  // comment this out when building for prod
  // ngOnInit() {
  //   this.data = sampleData;
  //   this.date = moment(new Date())
  //   .add(1, 'days')
  //   .format('DD MMMM, YYYY')
  //   .toString()
  //   .toUpperCase();
  // }

  // enable this when building for prod
  interval: any;
  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 10000);
  }


  refreshData() {
    this.flightsService.getStg1d1().subscribe(data => {
      this.data = data;
      this.totalCount = this.data.length;
    });
  }

  eventEmitted($event) {
    if ($event.event === 'onClick') {
      // console.log($event.value.row.csvFSDailyID);
      const dailyId = $event.value.row.csvFSDailyID;
      this.rowData = this.data.find( row => row.csvFSDailyID === dailyId);
      // console.log(this.rowData);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.data =  null;
    this.rowData = null;
    this.configuration = null;
  }

}
