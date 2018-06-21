import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCrmCustomersViewComponent } from './quote-crm-customers-view.component';

describe('QuoteCrmCustomersViewComponent', () => {
  let component: QuoteCrmCustomersViewComponent;
  let fixture: ComponentFixture<QuoteCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
