import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersVendorViewComponent } from './others-vendor-view.component';

describe('OthersVendorViewComponent', () => {
  let component: OthersVendorViewComponent;
  let fixture: ComponentFixture<OthersVendorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersVendorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersVendorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
