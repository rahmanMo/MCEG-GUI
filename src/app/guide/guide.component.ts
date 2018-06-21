import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuideComponent implements OnInit {

  constructor() { }
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
      type: 'etd',
      active: false
    },
    {
      type: 'eta',
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
      type: 'udd',
      active: false
    },
    {
      type: 'uda',
      active: false
    },
    {
      type: 'rmd',
      active: false
    },
    {
      type: 'rma',
      active: false
    },
    {
      type: 'grd',
      active: false
    },
    {
      type: 'air',
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
  }

  ngOnInit() {
  }

}
