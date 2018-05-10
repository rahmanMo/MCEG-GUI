import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage1D4Component } from './stage1-d4.component';

describe('Stage1D4Component', () => {
  let component: Stage1D4Component;
  let fixture: ComponentFixture<Stage1D4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage1D4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage1D4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
