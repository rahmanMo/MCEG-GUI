import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage2D5Component } from './stage2-d5.component';

describe('Stage2D5Component', () => {
  let component: Stage2D5Component;
  let fixture: ComponentFixture<Stage2D5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage2D5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage2D5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
