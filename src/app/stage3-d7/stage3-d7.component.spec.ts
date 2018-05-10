import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage3D7Component } from './stage3-d7.component';

describe('Stage3D7Component', () => {
  let component: Stage3D7Component;
  let fixture: ComponentFixture<Stage3D7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage3D7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage3D7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
