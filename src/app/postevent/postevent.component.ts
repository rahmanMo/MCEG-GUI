import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Flight } from '../models/flight';
import * as v from 'voca';

@Component({
  selector: 'app-postevent',
  templateUrl: './postevent.component.html',
  styleUrls: ['./postevent.component.scss']
})
export class PosteventComponent implements OnInit, OnChanges {

  @Input() inputFlight: Flight;
  // defining all the available events
  events = [
    'OUT',
    'OFF',
    'ON',
    'IN',
    'ETA',
    'ETD',
    'ETO',
    'EON',
    'SUB',
    'CNL',
    'DEL',
    'GTD',
    'GTA',
    'NEW',
    'RIN',
    'ASN',
    'REM',
    'UDD',
    'UDA',
    'RMD',
    'RMA',
    'AIR',
    'GRD',
    'DVC'
  ];
  selctedEvent = 'ETA';
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

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const data: Flight = changes.inputFlight.currentValue;
    if (data != null) {
      this.utcDate = v(data.numGMTDate).trim();
      this.flightNum = v(data.identifier).trim().padLeft(4, '0');
      this.origin = v(data.origin).trim();
      this.destination = v(data.destination).trim();
      this.stdUTC =  v(data.STDudt).trim().padLeft(4, '0');
    }
  }
}
