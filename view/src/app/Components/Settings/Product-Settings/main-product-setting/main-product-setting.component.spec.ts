import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProductSettingComponent } from './main-product-setting.component';

describe('MainProductSettingComponent', () => {
  let component: MainProductSettingComponent;
  let fixture: ComponentFixture<MainProductSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainProductSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProductSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
