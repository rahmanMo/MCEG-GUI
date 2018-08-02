import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage2D1Component } from './stage2-d1.component';

describe('Stage2D1Component', () => {
  let component: Stage2D1Component;
  let fixture: ComponentFixture<Stage2D1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage2D1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage2D1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
