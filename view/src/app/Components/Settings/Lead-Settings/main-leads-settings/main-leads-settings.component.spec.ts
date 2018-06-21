import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLeadsSettingsComponent } from './main-leads-settings.component';

describe('MainLeadsSettingsComponent', () => {
  let component: MainLeadsSettingsComponent;
  let fixture: ComponentFixture<MainLeadsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLeadsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLeadsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
