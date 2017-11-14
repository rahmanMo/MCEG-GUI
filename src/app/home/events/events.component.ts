import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { EventRow } from '../../models/event-row';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit {

  // Only for NEW event type
  public options: Pickadate.DateOptions = {
    format: 'yyyymmdd',
    formatSubmit: 'yyyymmdd',
  };

  // defining output event for all events
  @Output('eventAdded') eventAdded = new EventEmitter<EventRow>();

  eventName: string;
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
    }
    ,
    {
      type: 'gta',
      active: false
    },
    {
      type: 'gtd',
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
    }
  ];

   // utc date time
   utcDateNow: string;
   utcTimeNow: string;

   // define ngModels for databinding
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

   currentDateTimeUTC() {
     setInterval((dt) => {
      dt = new Date();
      this.utcDateNow = (dt.getUTCMonth() + 1).toString() + '/' +
                        dt.getUTCDate().toString() + '/' +
                        dt.getUTCFullYear().toString();
      this.utcTimeNow = dt.getUTCHours().toString() + ':' +
                        dt.getUTCMinutes().toString() + ':' +
                        dt.getUTCSeconds().toString();

      }, 1000);
   }

   ngOnInit() {

     this.currentDateTimeUTC();
   }


   resetBinding() {
     this.flight_number = null;
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
     this.eventName = event.type;
     this.events.forEach((e) => {
       if (e.type === event.type) {
         e.active = true;
       } else {
         e.active = false;
       }
     });
     this.eventName = this.eventName.toUpperCase();
     this.resetBinding();
   }


   // out form submit
   submitOUT() {

     this.eventAdded.emit({
       event_type: 'OUT',
       flight_number: this.flight_number,
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
       flight_origin_date_utc: '',
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
       event_type: 'OFF',
       flight_number: this.flight_number,
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
       flight_origin_date_utc: '',
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
       event_type: 'ON',
       flight_number: this.flight_number,
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
       flight_origin_date_utc: '',
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
       event_type: 'IN',
       flight_number: this.flight_number,
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
       flight_origin_date_utc: '',
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
       event_type: 'ETA',
       flight_number: this.flight_number,
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
       flight_origin_date_utc: '',
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
       event_type: 'ETD',
       flight_number: this.flight_number,
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
       flight_origin_date_utc: '',
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
       event_type: 'ETO',
       flight_number: this.flight_number,
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
       flight_origin_date_utc: '',
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
       event_type: 'EON',
       flight_number: this.flight_number,
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
       flight_origin_date_utc: '',
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
       event_type: 'SUB',
       flight_number: this.flight_number,
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
       flight_origin_date_utc: '',
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
       event_type: 'CNL',
       flight_number: this.flight_number,
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
       flight_origin_date_utc: '',
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
       event_type: 'DEL',
       flight_number: this.flight_number,
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
       flight_origin_date_utc: '',
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
       event_type: 'GTA',
       flight_number: this.flight_number,
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
       flight_origin_date_utc: '',
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
       event_type: 'GTD',
       flight_number: this.flight_number,
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
       flight_origin_date_utc: '',
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
           event_type: 'RIN',
           flight_number: this.flight_number,
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
           flight_origin_date_utc: '',
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
           event_type: 'ASN',
           flight_number: this.flight_number,
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
           flight_origin_date_utc: '',
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
          event_type: 'REM',
          flight_number: this.flight_number,
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
          flight_origin_date_utc: '',
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
          event_type: 'UDA',
          flight_number: this.flight_number,
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
          flight_origin_date_utc: '',
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
          event_type: 'UDD',
          flight_number: this.flight_number,
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
          flight_origin_date_utc: '',
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
          event_type: 'RMA',
          flight_number: this.flight_number,
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
          flight_origin_date_utc: '',
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
          event_type: 'RMD',
          flight_number: this.flight_number,
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
          flight_origin_date_utc: '',
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
          event_type: 'AIR',
          flight_number: this.flight_number,
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
          flight_origin_date_utc: '',
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
          event_type: 'GRD',
          flight_number: this.flight_number,
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
          flight_origin_date_utc: '',
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
          event_type: 'NEW',
          flight_number: this.flight_number,
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
          event_type: 'DVC',
          flight_number: this.flight_number,
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
          flight_origin_date_utc: '',
          flight_std_utc: '',
          flight_sta_utc: '',
          next_day_crossover: '',
          test_result: ''
        });

        this.resetBinding();

      }

}
