import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage3D2Component } from './stage3-d2.component';

describe('Stage3D2Component', () => {
  let component: Stage3D2Component;
  let fixture: ComponentFixture<Stage3D2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage3D2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage3D2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
