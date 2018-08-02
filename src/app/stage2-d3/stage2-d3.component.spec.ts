import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage2D3Component } from './stage2-d3.component';

describe('Stage2D3Component', () => {
  let component: Stage2D3Component;
  let fixture: ComponentFixture<Stage2D3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage2D3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage2D3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
