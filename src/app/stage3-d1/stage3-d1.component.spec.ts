import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage3D1Component } from './stage3-d1.component';

describe('Stage3D1Component', () => {
  let component: Stage3D1Component;
  let fixture: ComponentFixture<Stage3D1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage3D1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage3D1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
