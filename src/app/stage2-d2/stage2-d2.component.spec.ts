import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage2D2Component } from './stage2-d2.component';

describe('Stage2D2Component', () => {
  let component: Stage2D2Component;
  let fixture: ComponentFixture<Stage2D2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage2D2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage2D2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
