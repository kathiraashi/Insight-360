import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUomProductSettingsComponent } from './modal-uom-product-settings.component';

describe('ModalUomProductSettingsComponent', () => {
  let component: ModalUomProductSettingsComponent;
  let fixture: ComponentFixture<ModalUomProductSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUomProductSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUomProductSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
