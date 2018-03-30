export interface Flight {
  recordStatus: string;
  lastDateModified: string;
  lastTimeModified: string;
  lastUserToModify: string;
  legDepartureDate: string;
  airlineCode: string;
  identifier: string; //
  sequence: string; //
  flightOriginDay: string; // skip
  numericFlightDate: string; //
  numGMTDate: string; //
  STDudt: string; //
  STAudt: string; //
  tailNumber: string; //
  numLastDateModified: string;
  flightStatus: string;
  origin: string; //
  STDLocal: string;
  dispatchDesk: string;
  STDGMTVariance: string; //
  destination: string; //
  STALocal: string; //
  STAGMTVariance: string;
  OAGEquipmentType: string;
  ACConfiguration: string;
  serviceType: string;
  originGate: string; //
  ETDlocal: string; //
  ETDudt: string; //
  TAXIutc: string; //
  OUTudt: string; //
  OFFudt: string; //
  destinationGate: string; //
  ETAlocal: string;
  ETAudt: string;
  ONudt: string;
  INudt: string;
  previousTailNumber: string;
  ETE: string;
  DCNutc: string;
  ETOutc: string;
  EONutc: string;
  EDTCutc: string;
  flightType: string;
  newDepartureCity: string;
  newArrivalCity: string;
  SchedOAGEquipType: string;
  OAGEquipSubType: string;
  csvFSDailyID: string; //
  tailNumBeforeCancel: string;
  CTAUTC: string;
  cancelled: string;
  replaced: string;
  ATCStatus: string;
  scheduledFlightType: string;
  aircraftRouting: string;
  mealService: string;
  hub: string;
  landingRestriction: string;
  headStartFlight: string;
  actualDeparture: string;
  specialFlight: string;
  actualArrival: string;
  scheduledTaxiOut: string; //
  scheduledTaxiIn: string;
  STOSetByUser: string;
  STISetByUser: string;
  CTFlightNumber: string;
}
