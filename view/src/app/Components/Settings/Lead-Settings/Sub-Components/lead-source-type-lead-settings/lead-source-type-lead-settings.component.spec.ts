import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadSourceTypeLeadSettingsComponent } from './lead-source-type-lead-settings.component';

describe('LeadSourceTypeLeadSettingsComponent', () => {
  let component: LeadSourceTypeLeadSettingsComponent;
  let fixture: ComponentFixture<LeadSourceTypeLeadSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadSourceTypeLeadSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadSourceTypeLeadSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
