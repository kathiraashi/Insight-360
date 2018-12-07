import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelContactVendorViewComponent } from './model-contact-vendor-view.component';

describe('ModelContactVendorViewComponent', () => {
  let component: ModelContactVendorViewComponent;
  let fixture: ComponentFixture<ModelContactVendorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelContactVendorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelContactVendorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
