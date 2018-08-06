import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Flight } from '../models/flight';
import { AdhocEvent } from '../models/adhoc-event';
import * as v from 'voca';
import * as moment from 'moment';
import { FlightsService } from '../services/flights.service';

@Component({
  selector: 'app-postevent',
  templateUrl: './postevent.component.html',
  styleUrls: ['./postevent.component.scss']
})
export class PosteventComponent implements OnInit, OnChanges {

  @Input() inputFlight: Flight;
  @Input() env;
  @Input() selectedDay;
  public options: Pickadate.DateOptions = {
    format: 'yyyymmdd',
    formatSubmit: 'yyyymmdd',
    max: 6,
    min: -1
  };
  // defining all the available events
  events = [
    'OUT',
    'OFF',
    'ON',
    'IN',
    'ETD',
    'ETA',
    'ETO',
    'EON',
    'SUB',
    'CNL',
    'DEL',
    'GTD',
    'GTA',
    'RIN',
    'ASN',
    'REM',
    'UDD',
    'UDA',
    'RMD',
    'RMA',
    'GRD',
    'AIR',
    'DVC',
    'NEW'
  ];

  days = [
    { text: moment(new Date())
      .add(-1, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase(),
      value: 'd0'
    },
    { text: moment(new Date())
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase(),
      value: 'd1'
    },
    { text: moment(new Date())
      .add(1, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase(),
      value: 'd2'
    },
    { text: moment(new Date())
      .add(2, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase(),
      value: 'd3'
    },
    { text: moment(new Date())
      .add(3, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase(),
      value: 'd4'
    },
    { text: moment(new Date())
      .add(4, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase(),
      value: 'd5'
    },
    { text: moment(new Date())
      .add(5, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase(),
      value: 'd6'
    },
    { text: moment(new Date())
      .add(6, 'days')
      .format('DD MMM YYYY')
      .toString()
      .toUpperCase(),
      value: 'd7'
    }
  ];

  environment;
  environments = [ 'STG1', 'STG2', 'STG3'];
  selctedEvent;
  fsDailyId;
  utcDate;
  flightNum;
  origin;
  destination;
  stdUTC;
  staUTC;
  outUTC;
  offUTC;
  onUTC;
  inUTC;
  etaUTC;
  etdUTC;
  etoUTC;
  eonUTC;
  newTail;
  gtd;
  gta;
  diversionCity;
  nextDay;
  adhocMessage;
  fileName;
  timestamp;
  responseMessage;
  responseError;
  buttonEnable = true;

  constructor(private flightsService: FlightsService) {}

  ngOnInit() {
    if (this.env === 'STG1') {
      this.environment = 'STG1';
    } else if (this.env === 'STG2') {
      this.environment = 'STG2';
    } else if (this.env === 'STG3') {
      this.environment = 'STG3';
    }

  }

  reset() {
    this.utcDate = null;
    this.fsDailyId = null;
    this.flightNum = null;
    this.origin = null;
    this.destination = null;
    this.stdUTC = null;
    this.staUTC = null;
    this.outUTC = null;
    this.offUTC = null;
    this.onUTC = null;
    this.inUTC = null;
    this.etaUTC = null;
    this.etdUTC = null;
    this.etoUTC = null;
    this.eonUTC = null;
    this.newTail = null;
    this.gtd = null;
    this.gta = null;
    this.diversionCity = null;
    this.nextDay = null;
  }

  onSubmitOUT(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postOUT(this.environment, this.selectedDay, this.fsDailyId, this.outUTC).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitOFF(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postOFF(this.environment, this.selectedDay, this.fsDailyId, this.offUTC).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitON(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postON(this.environment, this.selectedDay, this.fsDailyId, this.onUTC).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitIN(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postIN(this.environment, this.selectedDay, this.fsDailyId, this.inUTC).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitETD(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postETD(this.environment, this.selectedDay, this.fsDailyId, this.etdUTC).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitETA(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postETA(this.environment, this.selectedDay, this.fsDailyId, this.etaUTC).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitETO(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postETO(this.environment, this.selectedDay, this.fsDailyId, this.etoUTC).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitEON(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postEON(this.environment, this.selectedDay, this.fsDailyId, this.eonUTC).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitSUB(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postSUB(this.environment, this.selectedDay, this.fsDailyId, this.newTail).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitCNL(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postCNL(this.environment, this.selectedDay, this.fsDailyId).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitDEL(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postDEL(this.environment, this.selectedDay, this.fsDailyId).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitGTD(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postGTD(this.environment, this.selectedDay, this.fsDailyId, this.gtd).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitGTA(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postGTA(this.environment, this.selectedDay, this.fsDailyId, this.gta).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitRIN(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postRIN(this.environment, this.selectedDay, this.fsDailyId).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitASN(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postASN(this.environment, this.selectedDay, this.fsDailyId, this.newTail).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitREM(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postREM(this.environment, this.selectedDay, this.fsDailyId).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitUDD(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postUDD(this.environment, this.selectedDay, this.fsDailyId).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitUDA(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postUDA(this.environment, this.selectedDay, this.fsDailyId).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitRMD(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postRMD(this.environment, this.selectedDay, this.fsDailyId).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitRMA(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postRMA(this.environment, this.selectedDay, this.fsDailyId).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitGRD(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postGRD(this.environment, this.selectedDay, this.fsDailyId).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitAIR(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postAIR(this.environment, this.selectedDay, this.fsDailyId).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitDVC(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postDVC(this.environment, this.selectedDay, this.fsDailyId, this.diversionCity, this.etaUTC).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }
  onSubmitNEW(event: Event) {
    event.preventDefault();
    this.buttonEnable = false;
    this.flightsService.postNEW(this.environment,
      this.flightNum,
      this.utcDate,
      this.origin,
      this.destination,
      this.stdUTC,
      this.staUTC,
      this.nextDay,
      this.newTail).subscribe(data => {
      this.responseMessage = data['message'];
      this.responseError = data['error'];
      // console.log(data);
      this.reset();
      this.buttonEnable = true;
    });
  }

  padWithZero(value) {
    return v(value).trim().padLeft(4, '0');
  }
  padWithSpace(value) {
    return v(value).trim().padLeft(4, ' ');
  }

  upcaseValue(value) {
    return v(value).trim().upperCase();
  }

  ngOnChanges(changes: SimpleChanges) {
    const data: Flight = changes.inputFlight.currentValue;
      if (data != null) {
        this.utcDate = v(data.numGMTDate).trim();
        this.flightNum = v(data.identifier).trim().padLeft(4, '0');
        this.origin = v(data.origin).trim().upperCase();
        this.destination = v(data.destination).trim().upperCase();
        this.stdUTC =  v(data.STDudt).trim().padLeft(4, '0');
        this.fsDailyId = v(data.csvFSDailyID).trim();
      }
  }
}
