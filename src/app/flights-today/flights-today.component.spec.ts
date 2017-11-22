import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsTodayComponent } from './flights-today.component';

describe('FlightsTodayComponent', () => {
  let component: FlightsTodayComponent;
  let fixture: ComponentFixture<FlightsTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
