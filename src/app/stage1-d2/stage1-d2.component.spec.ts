import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage1D2Component } from './stage1-d2.component';

describe('Stage1D2Component', () => {
  let component: Stage1D2Component;
  let fixture: ComponentFixture<Stage1D2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage1D2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage1D2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
