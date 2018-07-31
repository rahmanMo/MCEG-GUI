import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage2D0Component } from './stage2-d0.component';

describe('Stage2D0Component', () => {
  let component: Stage2D0Component;
  let fixture: ComponentFixture<Stage2D0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage2D0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage2D0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
