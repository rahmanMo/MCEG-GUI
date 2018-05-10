import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage1D6Component } from './stage1-d6.component';

describe('Stage1D6Component', () => {
  let component: Stage1D6Component;
  let fixture: ComponentFixture<Stage1D6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage1D6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage1D6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
