import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage1D5Component } from './stage1-d5.component';

describe('Stage1D5Component', () => {
  let component: Stage1D5Component;
  let fixture: ComponentFixture<Stage1D5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage1D5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage1D5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
