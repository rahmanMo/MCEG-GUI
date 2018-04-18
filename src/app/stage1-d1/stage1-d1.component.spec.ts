import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage1D1Component } from './stage1-d1.component';

describe('Stage1D1Component', () => {
  let component: Stage1D1Component;
  let fixture: ComponentFixture<Stage1D1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage1D1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage1D1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
