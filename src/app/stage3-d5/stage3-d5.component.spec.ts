import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage3D5Component } from './stage3-d5.component';

describe('Stage3D5Component', () => {
  let component: Stage3D5Component;
  let fixture: ComponentFixture<Stage3D5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage3D5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage3D5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
