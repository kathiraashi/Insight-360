import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainVendorViewComponent } from './main-vendor-view.component';

describe('MainVendorViewComponent', () => {
  let component: MainVendorViewComponent;
  let fixture: ComponentFixture<MainVendorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainVendorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainVendorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
