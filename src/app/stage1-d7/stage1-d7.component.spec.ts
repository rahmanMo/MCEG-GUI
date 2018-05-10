import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage1D7Component } from './stage1-d7.component';

describe('Stage1D7Component', () => {
  let component: Stage1D7Component;
  let fixture: ComponentFixture<Stage1D7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage1D7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage1D7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
