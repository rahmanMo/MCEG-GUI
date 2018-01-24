import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventRow } from '../../models/event-row';
import { EventService } from '../../services/event.service';
import { PapaParseService } from 'ngx-papaparse';

@Component({
  selector: 'app-que',
  templateUrl: './que.component.html',
  styleUrls: ['./que.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QueComponent implements OnInit {

  allEvents: EventRow[] = [];

  constructor(public eventService: EventService, private papa: PapaParseService) { }

  ngOnInit() {
    this.allEvents = this.eventService.getEvents();

  }

  removeEvent(event: EventRow) {
    this.eventService.removeEvent(event);
  }

  downloadCSV() {
    const data = this.allEvents;
    const csvData = this.papa.unparse(data);
    // console.log(csvData);
    const csv = new Blob([csvData], {type: 'text/csv;charset=utf-8;'});
    // IE11 & Edge
    if (navigator.msSaveBlob) {
      const fileName = 'test_data.csv';
      let blob = new Blob([csvData], {
        'type': 'text/csv;charset=utf8;'
      });
      navigator.msSaveBlob(blob, fileName);
    } else {
        // In FF link must be added to DOM to be clicked
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(csv);
        link.setAttribute('download', 'test_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

  }

}
