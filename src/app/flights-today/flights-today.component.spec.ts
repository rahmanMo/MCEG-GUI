import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsTodaySTG3Component } from './flights-today.component';

describe('FlightsTodayComponent', () => {
  let component: FlightsTodaySTG3Component;
  let fixture: ComponentFixture<FlightsTodaySTG3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsTodaySTG3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsTodaySTG3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
