import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage1D0Component } from './stage1-d0.component';

describe('Stage1D0Component', () => {
  let component: Stage1D0Component;
  let fixture: ComponentFixture<Stage1D0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage1D0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage1D0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
