import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage3D4Component } from './stage3-d4.component';

describe('Stage3D4Component', () => {
  let component: Stage3D4Component;
  let fixture: ComponentFixture<Stage3D4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage3D4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage3D4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
