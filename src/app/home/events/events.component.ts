import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { EventRow } from '../../models/event-row';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit {
  maxDate;
  minDate;
  public options: Pickadate.DateOptions = {
    format: 'yyyymmdd',
    formatSubmit: 'yyyymmdd',
    max: this.maxDate,
    min: this.minDate
  };

  // defining output event for all events
  @Output('eventAdded') eventAdded = new EventEmitter<EventRow>();

  eventName: string;
  errorMessage: string;

  // environment
  env: any = [
    {
      type: 'STG1',
      active: false
    },
    {
      type: 'STG3',
      active: false
    }
  ];

  // defining all the available events
  events: any = [
    {
      type: 'out',
      active: false
    },
    {
      type: 'off',
      active: false
    },
    {
      type: 'on',
      active: false
    },
    {
      type: 'in',
      active: false
    },
    {
      type: 'eta',
      active: false
    },
    {
      type: 'etd',
      active: false
    },
    {
      type: 'eto',
      active: false
    },
    {
      type: 'eon',
      active: false
    },
    {
      type: 'sub',
      active: false
    },
    {
      type: 'cnl',
      active: false
    },
    {
      type: 'del',
      active: false
    },
    {
      type: 'gtd',
      active: false
    },
    {
      type: 'gta',
      active: false
    },
    {
      type: 'new',
      active: false
    },
    {
      type: 'rin',
      active: false
    },
    {
      type: 'asn',
      active: false
    },
    {
      type: 'rem',
      active: false
    },
    {
      type: 'uda',
      active: false
    },
    {
      type: 'udd',
      active: false
    },
    {
      type: 'rma',
      active: false
    },
    {
      type: 'rmd',
      active: false
    },
    {
      type: 'air',
      active: false
    },
    {
      type: 'grd',
      active: false
    },
    {
      type: 'dvc',
      active: false
    },
    {
      type: 'none',
      active: false
    }
  ];

  // utc date time
  utcDateNow: string;
  utcTimeNow: string;

  // define ngModels for databinding
  stage = '';
  test_case_mode: string;
  event_type: string;
  test_case_id: string;
  previous_flight_num: string;
  flight_number: string;
  next_flight_num: string;
  adhoc_16_string: string;
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

  currentDateTimeUTC() {
    setInterval(dt => {
      dt = new Date();
      this.utcDateNow =
        (dt.getUTCMonth() + 1).toString() +
        '/' +
        dt.getUTCDate().toString() +
        '/' +
        dt.getUTCFullYear().toString();
      this.utcTimeNow =
        dt.getUTCHours().toString() +
        ':' +
        dt.getUTCMinutes().toString() +
        ':' +
        dt.getUTCSeconds().toString();
    }, 1000);
  }

  ngOnInit() {
    this.currentDateTimeUTC();
    let dateNow = new Date();
    let inputYear = dateNow.getUTCFullYear().toString();
    let inputMonth =
      (dateNow.getUTCMonth() < 9 ? '0' : '') + (dateNow.getUTCMonth() + 1);
    let inputDay =
      (dateNow.getUTCDate() < 10 ? '0' : '') + dateNow.getUTCDate();
    this.minDate = `${inputYear}${inputMonth}${inputDay}`;
    // adding 2 more days to todays date
    // adhoc processor can only handle today tomorrow and next day
    dateNow.setDate(dateNow.getDate() + 2);
    inputYear = dateNow.getUTCFullYear().toString();
    inputMonth =
      (dateNow.getUTCMonth() < 9 ? '0' : '') + (dateNow.getUTCMonth() + 1);
    inputDay = (dateNow.getUTCDate() < 10 ? '0' : '') + dateNow.getUTCDate();
    this.maxDate = `${inputYear}${inputMonth}${inputDay}`;
    this.options.min = this.minDate;
    this.options.max = this.maxDate;
  }

  resetBinding() {
    this.test_case_id = null;
    this.previous_flight_num = null;
    this.flight_number = null;
    this.next_flight_num = null;
    this.adhoc_16_string = null;
    this.actual_out_time_utc = null;
    this.actual_off_time_utc = null;
    this.actual_on_time_utc = null;
    this.actual_in_time_utc = null;
    this.actual_eta_time_utc = null;
    this.actual_etd_time_utc = null;
    this.actual_eto_time_utc = null;
    this.actual_eon_time_utc = null;
    this.new_tail_number = null;
    this.arrival_gate = null;
    this.departure_gate = null;
    this.diversion_city = null;
    this.flight_origin = null;
    this.flight_destination = null;
    this.flight_origin_date_utc = null;
    this.flight_std_utc = null;
    this.flight_sta_utc = null;
    this.next_day_crossover = null;
  }

  // function that handles the event emit
  whichEvent(event) {
    this.resetBinding();
    this.eventName = event.type;
    this.events.forEach(e => {
      if (e.type === event.type) {
        e.active = true;
      } else {
        e.active = false;
      }
    });
    this.eventName = this.eventName.toUpperCase();
  }

  // function that handles the event emit
  whichEnv(env) {
      this.errorMessage = null;
      this.stage = env.type;
      this.env.forEach(e => {
        if (e.type === env.type) {
          e.active = true;
        } else {
          e.active = false;
        }
      });
      this.stage = this.stage.toUpperCase();
  }

  // out form submit
  submitOUT() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'OUT',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: this.actual_out_time_utc,
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // off event submit
  submitOFF() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'OFF',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: this.actual_off_time_utc,
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // on event submit
  submitON() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'ON',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: this.actual_on_time_utc,
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // in event submit
  submitIN() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'IN',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: this.actual_in_time_utc,
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // eta event submit
  submitETA() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'ETA',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: this.actual_eta_time_utc,
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // etd event submit
  submitETD() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'ETD',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: this.actual_etd_time_utc,
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // eto event submit
  submitETO() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'ETO',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: this.actual_eto_time_utc,
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // eon event submit
  submitEON() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'EON',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: this.actual_eon_time_utc,
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // sub event submit
  submitSUB() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'SUB',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: this.new_tail_number,
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // cnl event submit
  submitCNL() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'CNL',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // del event submit
  submitDEL() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'DEL',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // gta event submit
  submitGTA() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'GTA',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: this.arrival_gate,
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // gtd event submit
  submitGTD() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'GTD',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: this.departure_gate,
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // RIN event submit
  submitRIN() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'RIN',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // ASN event submit
  submitASN() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'ASN',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: this.new_tail_number,
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // REM event submit
  submitREM() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'REM',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // UDA event submit
  submitUDA() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'UDA',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // UDD event submit
  submitUDD() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'UDD',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // RMA event submit
  submitRMA() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'RMA',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // RMD event submit
  submitRMD() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'RMD',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // AIR event submit
  submitAIR() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'AIR',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // GRD event submit
  submitGRD() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'GRD',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // NEW event submit
  submitNEW() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'NEW',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: this.new_tail_number,
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: this.flight_origin,
      flight_destination: this.flight_destination,
      flight_origin_date_utc: this.flight_origin_date_utc,
      flight_std_utc: this.flight_std_utc,
      flight_sta_utc: this.flight_sta_utc,
      next_day_crossover: this.next_day_crossover,
      test_result: ''
    });

    this.resetBinding();
  }

  // DVC event submit
  submitDVC() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'DVC',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: this.actual_eta_time_utc,
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: this.diversion_city,
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }

  // out form submit
  submitNONE() {
    this.eventAdded.emit({
      env: this.stage,
      test_case_mode: this.test_case_mode == null ? '' : this.test_case_mode,
      event_type: 'NONE',
      test_case_id: this.test_case_id == null ? '' : this.test_case_id,
      previous_flight_num: this.previous_flight_num == null ? '' : this.previous_flight_num,
      flight_number: this.flight_number,
      next_flight_num: this.next_flight_num == null ? '' : this.next_flight_num,
      adhoc_16_string: this.adhoc_16_string == null ? '' : this.adhoc_16_string,
      actual_out_time_utc: '',
      actual_off_time_utc: '',
      actual_on_time_utc: '',
      actual_in_time_utc: '',
      actual_eta_time_utc: '',
      actual_etd_time_utc: '',
      actual_eto_time_utc: '',
      actual_eon_time_utc: '',
      new_tail_number: '',
      arrival_gate: '',
      departure_gate: '',
      diversion_city: '',
      flight_origin: '',
      flight_destination: '',
      flight_origin_date_utc: this.flight_origin_date_utc == null ? '' : this.flight_origin_date_utc,
      flight_std_utc: '',
      flight_sta_utc: '',
      next_day_crossover: '',
      test_result: ''
    });

    this.resetBinding();
  }
}
