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
    'ON_',
    'IN_',
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
    'DVC'
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
  responseString;

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
    this.flightsService.postOUT(this.environment, this.selectedDay, this.fsDailyId, this.outUTC).subscribe(data => {
      this.responseString = data;
      console.log(data);
      this.reset();
    });
  }
  onSubmitOFF(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}${this.offUTC}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitON(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}${this.onUTC}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitIN(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}${this.inUTC}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitETD(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}${this.etdUTC}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitETA(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}${this.etaUTC}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitETO(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}${this.etoUTC}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitEON(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}${this.eonUTC}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitSUB(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}${this.newTail}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitCNL(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitDEL(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitGTD(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}${this.gtd}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitGTA(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}${this.gta}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitRIN(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitASN(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}${this.newTail}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitREM(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitUDD(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitUDA(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitRMD(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitRMA(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitGRD(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
    });
  }
  onSubmitAIR(event: Event) {
    event.preventDefault();
    this.adhocMessage
    = `ADH016_${this.flightNum}${this.utcDate}${this.origin}${this.destination}${this.stdUTC}${this.selctedEvent}`;
    const adhocEvent: AdhocEvent = {
      stg: this.environment,
      adhoc16: this.adhocMessage
    };
    this.flightsService.postEvent(adhocEvent).subscribe(data => {
      this.fileName = data['fileName'];
      this.timestamp = data['timestamp'];
      this.reset();
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
      }
  }
}
