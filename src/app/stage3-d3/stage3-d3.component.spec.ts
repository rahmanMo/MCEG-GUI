import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage3D3Component } from './stage3-d3.component';

describe('Stage3D3Component', () => {
  let component: Stage3D3Component;
  let fixture: ComponentFixture<Stage3D3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage3D3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage3D3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
