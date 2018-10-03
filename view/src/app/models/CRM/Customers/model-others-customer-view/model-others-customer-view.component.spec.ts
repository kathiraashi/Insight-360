import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOthersCustomerViewComponent } from './model-others-customer-view.component';

describe('ModelOthersCustomerViewComponent', () => {
  let component: ModelOthersCustomerViewComponent;
  let fixture: ComponentFixture<ModelOthersCustomerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelOthersCustomerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelOthersCustomerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
