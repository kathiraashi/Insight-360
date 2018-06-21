import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelLogPhoneCallLeadsComponentsComponent } from './model-log-phone-call-leads-components.component';

describe('ModelLogPhoneCallLeadsComponentsComponent', () => {
  let component: ModelLogPhoneCallLeadsComponentsComponent;
  let fixture: ComponentFixture<ModelLogPhoneCallLeadsComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelLogPhoneCallLeadsComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelLogPhoneCallLeadsComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
