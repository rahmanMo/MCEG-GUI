import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage1D3Component } from './stage1-d3.component';

describe('Stage1D3Component', () => {
  let component: Stage1D3Component;
  let fixture: ComponentFixture<Stage1D3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage1D3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage1D3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
