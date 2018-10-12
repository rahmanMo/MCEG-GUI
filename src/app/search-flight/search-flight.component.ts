import { Component, OnInit } from '@angular/core';
import { Flight } from '../models/flight';
import * as v from 'voca';
import * as moment from 'moment';
import { FlightsService } from '../services/flights.service';
import { EventService } from '../services/event.service';
import { ConfigService } from '../services/config-service';
import { ConfigServiceExtra } from '../services/config-service-extra';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {

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

  allColumns = [
    { key: 'recordStatus', title: 'Record Status' },
    { key: 'lastDateModified', title: 'Last Date Modified' },
    { key: 'lastTimeModified', title: 'Last Time Modified' },
    { key: 'lastUserToModify', title: 'Last User To Modify' },
    { key: 'legDepartureDate', title: 'Leg Departure Date' },
    { key: 'airlineCode', title: 'Airline Code' },
    { key: 'identifier', title: 'Flight #' },
    { key: 'sequence', title: 'Sequence' },
    { key: 'flightOriginDay', title: 'Flight Origin Day' },
    { key: 'numericFlightDate', title: 'Local Date' },
    { key: 'numGMTDate', title: 'UTC Date' },
    { key: 'STDudt', title: 'STD-UTC' },
    { key: 'STAudt', title: 'STA-UTC' },
    { key: 'tailNumber', title: 'Tail Number' },
    { key: 'numLastDateModified', title: 'Num Last Date Modified' },
    { key: 'flightStatus', title: 'Flight Status' },
    { key: 'origin', title: 'Origin' },
    { key: 'STDLocal', title: 'STD-Local' },
    { key: 'dispatchDesk', title: 'Dispatch Desk' },
    { key: 'STDGMTVariance', title: 'STD-UTC-Offset' },
    { key: 'destination', title: 'Destination' },
    { key: 'STALocal', title: 'STA-Local' },
    { key: 'STAGMTVariance', title: 'STA-UTC-Offset' },
    { key: 'OAGEquipmentType', title: 'OAG Equipment Type' },
    { key: 'ACConfiguration', title: 'AC Configuration' },
    { key: 'serviceType', title: 'Service Type' },
    { key: 'originGate', title: 'Origin Gate' },
    { key: 'ETDlocal', title: 'ETD-Local' },
    { key: 'ETDudt', title: 'ETD-UTC' },
    { key: 'TAXIutc', title: 'TAXI-UTC' },
    { key: 'OUTudt', title: 'OUT-UTC' },
    { key: 'OFFudt', title: 'OFF-UTC' },
    { key: 'destinationGate', title: 'Destination Gate' },
    { key: 'ETAlocal', title: 'ETA-Local' },
    { key: 'ETAudt', title: 'ETA-UTC' },
    { key: 'ONudt', title: 'ON-UTC' },
    { key: 'INudt', title: 'IN-UTC' },
    { key: 'previousTailNumber', title: 'Previous Tail Number' },
    { key: 'ETE', title: 'ETE' },
    { key: 'DCNutc', title: 'DCN-UTC' },
    { key: 'ETOutc', title: 'ETO-UTC' },
    { key: 'EONutc', title: 'EON-UTC' },
    { key: 'EDTCutc', title: 'EDTC-UTC' },
    { key: 'flightType', title: 'Flight Type' },
    { key: 'newDepartureCity', title: 'New Departure City' },
    { key: 'newArrivalCity', title: 'New Arrival City' },
    { key: 'SchedOAGEquipType', title: 'Sched OAG Equip Type' },
    { key: 'OAGEquipSubType', title: 'OAG Equip Sub Type' },
    { key: 'csvFSDailyID', title: 'FS DailyID' },
    { key: 'tailNumBeforeCancel', title: 'Tail Num Before Cancel' },
    { key: 'CTAUTC', title: 'CTA-UTC' },
    { key: 'cancelled', title: 'Cancelled (X)' },
    { key: 'replaced', title: 'Replaced' },
    { key: 'ATCStatus', title: 'ATC Status' },
    { key: 'scheduledFlightType', title: 'Scheduled Flight Type' },
    { key: 'aircraftRouting', title: 'Aircraft Routing' },
    { key: 'mealService', title: 'Meal Service' },
    { key: 'hub', title: 'Hub' },
    { key: 'landingRestriction', title: 'Landing Restriction' },
    { key: 'headStartFlight', title: 'Head Start Flight' },
    { key: 'actualDeparture', title: 'Actual Departure' },
    { key: 'specialFlight', title: 'Special Flight' },
    { key: 'actualArrival', title: 'Actual Arrival' },
    { key: 'scheduledTaxiOut', title: 'Scheduled Taxi Out' },
    { key: 'scheduledTaxiIn', title: 'Scheduled Taxi In' },
    { key: 'STOSetByUser', title: 'STO Set By User' },
    { key: 'STISetByUser', title: 'STI Set By User' },
    { key: 'CTFlightNumber', title: 'CT Flight Number' }
  ];
  configuration;
  configurationExtra;
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
  errorMsg;
  flights: Flight[];
  selectedDay;
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

  constructor(private flightsService: FlightsService, public eventService: EventService) {
    this.configuration = ConfigService.config;
    this.configurationExtra = ConfigServiceExtra.config;
  }

  ngOnInit() {
    // this.eventService.currentEnv.subscribe(env => this.environment = env);
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

  getByFlightNum(event: Event) {
    event.preventDefault();
    this.flightsService.getByFlightNum(this.environment, this.selectedDay, this.flightNum).subscribe(data => {
      if (data.length === 0) {
        this.errorMsg = 'No Flights Found';
        this.flights = null;
      } else {
        this.flights = data;
        this.errorMsg = null;
      }});
  }
  getByDailyId(event: Event) {
    event.preventDefault();
    this.flightsService.getByDailyid(this.environment, this.selectedDay, this.fsDailyId).subscribe(data => {
      if (data.length === 0) {
        this.errorMsg = 'No Flights Found';
        this.flights = null;
      } else {
        this.flights = data;
        this.errorMsg = null;
      }});
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

}
