export interface EventRow {
  env: string;
  event_type: string;
  flight_number: string;
  actual_out_time_utc: string;
  actual_off_time_utc: string;
  actual_on_time_utc: string;
  actual_in_time_utc: string;
  actual_eta_time_utc: string;
  actual_etd_time_utc: string;
  actual_eto_time_utc: string;
  actual_eon_time_utc: string;
  new_tail_number: string;
  arrival_gate: string;
  departure_gate: string;
  diversion_city: string;
  flight_origin: string;
  flight_destination: string;
  flight_origin_date_utc: string;
  flight_std_utc: string;
  flight_sta_utc: string;
  next_day_crossover: string;
  test_result: string;
}
