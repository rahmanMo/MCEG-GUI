import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage2D7Component } from './stage2-d7.component';

describe('Stage2D7Component', () => {
  let component: Stage2D7Component;
  let fixture: ComponentFixture<Stage2D7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage2D7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage2D7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
