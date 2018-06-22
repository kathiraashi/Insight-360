import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuotationsCreateComponent } from './purchase-quotations-create.component';

describe('PurchaseQuotationsCreateComponent', () => {
  let component: PurchaseQuotationsCreateComponent;
  let fixture: ComponentFixture<PurchaseQuotationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseQuotationsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseQuotationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
