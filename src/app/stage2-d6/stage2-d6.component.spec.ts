import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage2D6Component } from './stage2-d6.component';

describe('Stage2D6Component', () => {
  let component: Stage2D6Component;
  let fixture: ComponentFixture<Stage2D6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage2D6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage2D6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
