import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutVendorViewComponent } from './about-vendor-view.component';

describe('AboutVendorViewComponent', () => {
  let component: AboutVendorViewComponent;
  let fixture: ComponentFixture<AboutVendorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutVendorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutVendorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
