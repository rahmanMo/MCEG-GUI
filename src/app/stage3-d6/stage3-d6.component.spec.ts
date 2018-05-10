import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage3D6Component } from './stage3-d6.component';

describe('Stage3D6Component', () => {
  let component: Stage3D6Component;
  let fixture: ComponentFixture<Stage3D6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage3D6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage3D6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
