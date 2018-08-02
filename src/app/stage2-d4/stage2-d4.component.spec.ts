import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage2D4Component } from './stage2-d4.component';

describe('Stage2D4Component', () => {
  let component: Stage2D4Component;
  let fixture: ComponentFixture<Stage2D4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage2D4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage2D4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
