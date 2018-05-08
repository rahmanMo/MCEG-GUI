import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage3D0Component } from './stage3-d0.component';

describe('Stage3D0Component', () => {
  let component: Stage3D0Component;
  let fixture: ComponentFixture<Stage3D0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage3D0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage3D0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
