import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Flight } from '../models/flight';
import { FlightsService } from '../services/flights.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-flights-today-stg3',
  templateUrl: './flights-today.component.html',
  styleUrls: ['./flights-today.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlightsTodaySTG3Component implements OnInit {

  constructor(private flightsService: FlightsService) { }
  todaysFlights: Flight[];
  // todaysFlights: Flight[] = [{"recordStatus": "",
  //                  "lastDateModified": "25NOV17",
  //                   "lastTimeModified": "1213",
  //    "lastUserToModify": "PLNK",
  //     "legDepartureDate": "28NOV17",
  //      "airlineCode": "JBU",
  //       "identifier": "   1 ",
  //        "sequence": "10", "flightOriginDay": "28",
  //         "numericFlightDate": "20171128",
  //          "numGMTDate": "20171128",
  //           "STDudt": "1549",
  //            "STAudt": "1849",
  //             "tailNumber": "952   ",
  //              "numLastDateModified": "20171125",
  //               "flightStatus": "SC05",
  //                "origin": "JFK ",
  //                 "STDLocal": "1049",
  //                  "dispatchDesk": "DM",
  //                   "STDGMTVariance": "-0500",
  //                    "destination": "FLL ",
  //                     "STALocal": "1349",
  //                      "STAGMTVariance": "-0500",
  //                       "OAGEquipmentType": "321 ",
  //                        "ACConfiguration": "",
  //                         "serviceType": "",
  //                          "originGate": "",
  //                           "ETDlocal": "1049",
  //                            "ETDudt": "1549",
  //                             "TAXIutc": "",
  //                              "OUTudt": "2055",
  //                               "OFFudt": "",
  //                                "destinationGate": "",
  //                                 "ETAlocal": "1349",
  //                                  "ETAudt": "1849",
  //                                   "ONudt": "",
  //                                    "INudt": "",
  //                                     "previousTailNumber": "971 ",
  //                                      "ETE": "",
  //                                       "DCNutc": "",
  //                                        "ETOutc": "",
  //                                         "EONutc": "",
  //                                          "EDTCutc": "",
  //                                           "flightType": "0",
  //                                            "newDepartureCity": "",
  //                                             "newArrivalCity": "",
  //                                              "SchedOAGEquipType": "321 ",
  //                                               "OAGEquipSubType": "",
  //                                                "csvFSDailyID": "4519000",
  //                                                 "tailNumBeforeCancel": "",
  //                                                  "CTAUTC": "",
  //                                                   "cancelled": "",
  //                                                    "replaced": "0",
  //                                                     "ATCStatus": "0",
  //                                                      "scheduledFlightType": "0",
  //                                                       "aircraftRouting": "> 202 ",
  //                                                        "mealService": "", "hub": "JFK",
  //                                                         "landingRestriction": "3",
  //                                                          "headStartFlight": "0",
  //                                                           "actualDeparture": "2017-11-28 15:49:00.000",
  //                                                            "specialFlight": "0",
  //                                                             "actualArrival": "2017-11-28 18:49:00.000",
  //                                                              "scheduledTaxiOut": "29",
  //                                                               "scheduledTaxiIn": "7",
  //                                                                "STOSetByUser": "0",
  //                                                                 "STISetByUser": "0",
  //                                                                  "CTFlightNumber": "0001"}];

  interval: any;

  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => {
        this.refreshData();
    }, 10000);
  }

  refreshData() {
      this.flightsService.getTodaysFlights()
          .subscribe(data => {
              this.todaysFlights = data;
          });
    }

  trackByFlights(index: number, flight: Flight): number { return Number(flight.csvFSDailyID); }

  }
