import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Flight } from '../models/flight';
import { ConfigService } from '../services/config-service';
import { ConfigServiceExtra } from '../services/config-service-extra';
import { PapaParseService } from 'ngx-papaparse';
import * as v from 'voca';
@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DataViewComponent implements OnInit, OnDestroy, OnChanges {

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

  @Input() date: string;
  @Input() selectedDay: string;
  @Input() data = [];
  @Input() env;
  rowData: Flight;
  configuration;
  configurationExtra;
  totalCount: any;
  fileName;
  depflightStatus;
  arrflightStatus;

  constructor(
    private papa: PapaParseService
  ) {
    this.configuration = ConfigService.config;
    this.configurationExtra = ConfigServiceExtra.config;
  }

  ngOnInit() {
    this.totalCount = this.data.length;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.totalCount = this.data.length;
  }

  eventEmitted($event) {
    if ($event.event === 'onClick') {
      const dailyId = $event.value.row.csvFSDailyID;
      this.rowData = this.data.find(row => row.csvFSDailyID === dailyId);
      if (
        this.rowData.OUTudt !== '' &&
        this.rowData.OFFudt === '' &&
        this.rowData.ONudt === '' &&
        this.rowData.INudt === ''
      ) {
        this.depflightStatus = 'Flight';
        this.arrflightStatus = 'Taxiing';
      } else if (
        this.rowData.OUTudt !== '' &&
        this.rowData.OFFudt !== '' &&
        this.rowData.ONudt === '' &&
        this.rowData.INudt === ''
      ) {
        this.depflightStatus = 'IN';
        this.arrflightStatus = 'Flight';
      } else if (
        this.rowData.OUTudt !== '' &&
        this.rowData.OFFudt !== '' &&
        this.rowData.ONudt !== '' &&
        this.rowData.INudt === ''
      ) {
        this.depflightStatus = 'Flight';
        this.arrflightStatus = 'Landed';
      } else if (
        this.rowData.OUTudt !== '' &&
        this.rowData.OFFudt !== '' &&
        this.rowData.ONudt !== '' &&
        this.rowData.INudt !== ''
      ) {
        this.depflightStatus = 'Flight';
        this.arrflightStatus = 'Arrived';
      } else if (this.rowData.STDudt === this.rowData.ETDudt) {
        this.depflightStatus = 'DEP On-Time';
      } else if (this.rowData.STDudt > this.rowData.ETDudt) {
        this.depflightStatus = 'DEP Early';
      } else if (this.rowData.STDudt < this.rowData.ETDudt) {
        this.depflightStatus = 'DEP Delayed';
      }
      if (
        this.rowData.OUTudt !== '' &&
        this.rowData.OFFudt === '' &&
        this.rowData.ONudt === '' &&
        this.rowData.INudt === ''
      ) {
        this.depflightStatus = 'Flight';
        this.arrflightStatus = 'Taxiing';
      } else if (
        this.rowData.OUTudt !== '' &&
        this.rowData.OFFudt !== '' &&
        this.rowData.ONudt === '' &&
        this.rowData.INudt === ''
      ) {
        this.depflightStatus = 'IN';
        this.arrflightStatus = 'Flight';
      } else if (
        this.rowData.OUTudt !== '' &&
        this.rowData.OFFudt !== '' &&
        this.rowData.ONudt !== '' &&
        this.rowData.INudt === ''
      ) {
        this.depflightStatus = 'Flight';
        this.arrflightStatus = 'Landed';
      } else if (
        this.rowData.OUTudt !== '' &&
        this.rowData.OFFudt !== '' &&
        this.rowData.ONudt !== '' &&
        this.rowData.INudt !== ''
      ) {
        this.depflightStatus = 'Flight';
        this.arrflightStatus = 'Arrived';
      } else if (this.rowData.STAudt === this.rowData.ETAudt) {
        this.arrflightStatus = 'ARR On-Time';
      } else if (this.rowData.STAudt > this.rowData.ETAudt) {
        this.arrflightStatus = 'ARR Early';
      } else if (this.rowData.STAudt < this.rowData.ETAudt) {
        this.arrflightStatus = 'ARR Delayed';
      }
      if (this.rowData.cancelled === 'X') {
        this.depflightStatus = 'Flight';
        this.arrflightStatus = 'Cancelled';
      }
      if (v(this.rowData.tailNumber).startsWith('-', 0) === true) {
        this.depflightStatus = 'Negative';
        this.arrflightStatus = 'Tail';
      }
    }
  }

  downloadCSV() {
    const data = this.data;
    const csvData = this.papa.unparse(data);
    const csv = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    let fileName: string;
    if (this.fileName === undefined || this.fileName === '') {
      fileName = `${this.env}-${this.date}.csv`;
    } else {
      fileName = `${this.fileName}-${this.env}-${this.date}.csv`;
    }
    // IE11 & Edge
    if (navigator.msSaveBlob) {
      const blob = new Blob([csvData], {
        type: 'text/csv;charset=utf8;'
      });
      navigator.msSaveBlob(blob, fileName);
    } else {
      // In FF link must be added to DOM to be clicked
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(csv);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  ngOnDestroy() {
    this.data = null;
    this.rowData = null;
    this.configuration = null;
  }

}
