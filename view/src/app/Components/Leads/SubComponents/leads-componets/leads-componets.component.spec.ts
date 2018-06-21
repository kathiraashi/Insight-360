import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsComponetsComponent } from './leads-componets.component';

describe('LeadsComponetsComponent', () => {
  let component: LeadsComponetsComponent;
  let fixture: ComponentFixture<LeadsComponetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsComponetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsComponetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
