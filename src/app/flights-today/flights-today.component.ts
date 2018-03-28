import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Flight } from "../models/flight";
import { FlightsService } from "../services/flights.service";
import { Observable } from "rxjs/Observable";
import { ConfigService } from "./config-service";
import { sampleData } from '../../assets/data';

@Component({
  selector: "app-flights-today-stg3",
  templateUrl: "./flights-today.component.html",
  styleUrls: ["./flights-today.component.scss"],
  providers: [ConfigService],
  encapsulation: ViewEncapsulation.None
})
export class FlightsTodaySTG3Component implements OnInit {
  // constructor(private flightsService: FlightsService) { }

  basicColumns = [
    { key: "identifier", title: "Flight #" },
    { key: "tailNumber", title: "Tail #" },
    { key: "origin", title: "Origin" },
    { key: "destination", title: "Destination" },
    { key: "STDudt", title: "STD-UTC" },
    { key: "STAudt", title: "STA-UTC" },
    { key: "numGMTDate", title: "UTC Date" },
    { key: "numericFlightDate", title: "Local Date" }
  ];
  specColumns = [
    { key: "identifier", title: "Flight #" },
    { key: "OAGEquipmentType", title: "Equipment" },
    { key: "sequence", title: "Sequence" },
    { key: "csvFSDailyID", title: "DailyID" },
  ];
  miscColumns = [
    { key: "identifier", title: "Flight #" },
    { key: "previousTailNumber", title: "Prev-Tail" },
    { key: "tailNumBeforeCancel", title: "Tail#-Before-Cancel" },
    { key: "flightStatus", title: "Status" },
    { key: "cancelled", title: "Cancelled?" },
  ];
  gateColumns = [
    { key: "identifier", title: "Flight #" },
    { key: "origin", title: "Origin" },
    { key: "originGate", title: "Origin-Gate" },
    { key: "destination", title: "Destination" },
    { key: "destinationGate", title: "Destination-Gate" }
  ];
  originTimeColumns = [
    { key: "identifier", title: "Flight #" },
    { key: "STDudt", title: "STD-UTC" },
    { key: "STDLocal", title: "STD-Local" },
    { key: "ETDudt", title: "ETD-UTC" },
    { key: "ETDlocal", title: "ETD-Local" },
    { key: "OUTudt", title: "OUT-UTC" },
    { key: "OFFudt", title: "OFF-UTC" },
    { key: "ETOutc", title: "ETO-UTC" },
    { key: "STDGMTVariance", title: "UTC-Offset" },

  ];
  destinationTimeColumns = [
    { key: "identifier", title: "Flight #" },
    { key: "STAudt", title: "STA-UTC" },
    { key: "STALocal", title: "STA-Local" },
    { key: "ETAudt", title: "ETA-UTC" },
    { key: "ETAlocal", title: "ETA-Local" },
    { key: "ONudt", title: "ON-UTC" },
    { key: "INudt", title: "IN-UTC" },
    { key: "EONutc", title: "EON-UTC" },
    { key: "STAGMTVariance", title: "UTC-Offset" },

  ];

  data = [];
  clicked = {};
  rowData = {};
  configuration;

  constructor(private flightsService: FlightsService) {
    this.configuration = ConfigService.config;
  }

  // comment this out when building for prod
  ngOnInit() {
    this.data = sampleData;
  }

  // enable this when building for prod
  // ngOnInit() {
  //   this.refreshData();
  //   const interval = setInterval(() => {
  //     this.refreshData();
  //   }, 10000);
  // }

  refreshData() {
    this.flightsService.getTodaysFlights().subscribe(data => {
      this.data = data;
    });
  }

  eventEmitted($event) {
    // this.clicked = JSON.stringify($event.value);
    this.rowData = $event.value.row;
    // this.rowData = this.clicked.values;
    // console.log(this.clicked);
    console.log($event);
    console.log(this.rowData);
  }

}
