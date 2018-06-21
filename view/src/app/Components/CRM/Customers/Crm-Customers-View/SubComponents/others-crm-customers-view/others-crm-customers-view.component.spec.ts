import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersCrmCustomersViewComponent } from './others-crm-customers-view.component';

describe('OthersCrmCustomersViewComponent', () => {
  let component: OthersCrmCustomersViewComponent;
  let fixture: ComponentFixture<OthersCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
