import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuotationsEditComponent } from './purchase-quotations-edit.component';

describe('PurchaseQuotationsEditComponent', () => {
  let component: PurchaseQuotationsEditComponent;
  let fixture: ComponentFixture<PurchaseQuotationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseQuotationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseQuotationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
