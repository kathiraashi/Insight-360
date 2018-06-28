import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsVendorViewComponent } from './contacts-vendor-view.component';

describe('ContactsVendorViewComponent', () => {
  let component: ContactsVendorViewComponent;
  let fixture: ComponentFixture<ContactsVendorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsVendorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsVendorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
