import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelLeadsourceLeadsettingsComponent } from './model-leadsource-leadsettings.component';

describe('ModelLeadsourceLeadsettingsComponent', () => {
  let component: ModelLeadsourceLeadsettingsComponent;
  let fixture: ComponentFixture<ModelLeadsourceLeadsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelLeadsourceLeadsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelLeadsourceLeadsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
