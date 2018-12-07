import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UomSettingsComponent } from './uom-settings.component';

describe('UomSettingsComponent', () => {
  let component: UomSettingsComponent;
  let fixture: ComponentFixture<UomSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UomSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UomSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
