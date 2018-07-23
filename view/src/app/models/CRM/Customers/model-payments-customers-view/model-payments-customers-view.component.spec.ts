import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPaymentsCustomersViewComponent } from './model-payments-customers-view.component';

describe('ModelPaymentsCustomersViewComponent', () => {
  let component: ModelPaymentsCustomersViewComponent;
  let fixture: ComponentFixture<ModelPaymentsCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPaymentsCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPaymentsCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
