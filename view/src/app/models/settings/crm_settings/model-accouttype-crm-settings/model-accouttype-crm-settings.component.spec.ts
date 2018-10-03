import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAccouttypeCrmSettingsComponent } from './model-accouttype-crm-settings.component';

describe('ModelAccouttypeCrmSettingsComponent', () => {
  let component: ModelAccouttypeCrmSettingsComponent;
  let fixture: ComponentFixture<ModelAccouttypeCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAccouttypeCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAccouttypeCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
