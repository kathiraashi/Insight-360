import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModelContactinfoCompanySettingsComponent } from './create-model-contactinfo-company-settings.component';

describe('CreateModelContactinfoCompanySettingsComponent', () => {
  let component: CreateModelContactinfoCompanySettingsComponent;
  let fixture: ComponentFixture<CreateModelContactinfoCompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateModelContactinfoCompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModelContactinfoCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
